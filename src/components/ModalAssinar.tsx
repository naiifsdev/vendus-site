import { useState, useEffect } from 'react';
import { initMercadoPago, CardPayment } from '@mercadopago/sdk-react';
import { supabase } from '../lib/supabaseClient';

interface ModalAssinarProps {
  isOpen: boolean;
  onClose: () => void;
}

type PaymentStatus =
  | 'idle'
  | 'approved'
  | 'in_process'
  | 'pending'
  | 'authorized'
  | 'rejected'
  | 'cancelled'
  | 'in_mediation';

type PaymentFeedback = {
  info?: string;
  error?: string;
};

const PAYMENT_MESSAGES: Record<string, PaymentFeedback> = {
  accredited: {
    info: 'Pagamento aprovado! Seu acesso será liberado em instantes.',
  },
  pending_contingency: {
    info: 'Estamos confirmando o pagamento com o emissor. Você receberá um e-mail assim que for aprovado.',
  },
  pending_review_manual: {
    info: 'Pagamento em análise manual. Avisaremos por e-mail assim que houver uma atualização.',
  },
  in_process: {
    info: 'Pagamento em processamento. Assim que for aprovado, enviaremos um e-mail.',
  },
  pending: {
    info: 'Pagamento pendente de confirmação. Fique de olho no seu e-mail.',
  },
  authorized: {
    info: 'Pagamento autorizado e aguardando confirmação do emissor.',
  },
  in_mediation: {
    info: 'Pagamento em mediação. Entraremos em contato por e-mail.',
  },
  cc_rejected_bad_filled_card_number: {
    error: 'Número do cartão inválido. Revise e tente novamente.',
  },
  cc_rejected_bad_filled_date: {
    error: 'Data de validade inválida. Corrija para continuar.',
  },
  cc_rejected_bad_filled_security_code: {
    error: 'Código de segurança inválido. Revise o CVV e tente novamente.',
  },
  cc_rejected_bad_filled_other: {
    error: 'Dados do cartão inválidos. Revise e tente novamente.',
  },
  cc_rejected_high_risk: {
    error: 'Pagamento recusado por medidas de segurança. Utilize outro cartão ou contate o emissor.',
  },
  cc_rejected_insufficient_amount: {
    error: 'Pagamento recusado: saldo insuficiente. Tente outro cartão.',
  },
  cc_rejected_max_attempts: {
    error: 'Número máximo de tentativas atingido. Aguarde alguns minutos ou use outro cartão.',
  },
  cc_rejected_card_disabled: {
    error: 'Cartão inativo ou bloqueado. Entre em contato com o emissor para liberar uso online.',
  },
  cc_rejected_call_for_authorize: {
    error: 'Pagamento recusado. Ligue para o emissor do cartão e autorize a operação.',
  },
  cc_rejected_duplicated_payment: {
    error: 'Pagamento duplicado detectado. Verifique sua fatura antes de tentar novamente.',
  },
  cc_rejected_invalid_installments: {
    error: 'Parcelamento indisponível para este cartão. Escolha outra opção.',
  },
  cc_rejected_other: {
    error: 'Pagamento recusado pelo emissor. Utilize outro cartão ou contate o banco.',
  },
  rejected: {
    error: 'Pagamento não aprovado. Verifique os dados e tente novamente.',
  },
  cancelled: {
    error: 'Pagamento cancelado antes da conclusão.',
  },
  refunded: {
    info: 'Pagamento estornado com sucesso.',
  },
  '106': {
    error: 'Você já realizou um pagamento para esta compra. Verifique se o pedido foi duplicado.',
  },
  '109': {
    error: 'O valor supera o permitido para este cartão. Utilize outra forma de pagamento.',
  },
  '126': {
    error: 'Não foi possível processar o pagamento com estes dados. Utilize outro cartão.',
  },
  '129': {
    error: 'O emissor não processa pagamentos no valor informado.',
  },
  '145': {
    error: 'O comprador não pode pagar este valor. Tente outro cartão.',
  },
  '150': {
    error: 'O cartão não permite pagamentos no valor escolhido.',
  },
  '151': {
    error: 'O cartão não permite pagamentos parcelados para este valor.',
  },
  '160': {
    error: 'Não foi possível processar o pagamento. Use outro cartão.',
  },
  '204': {
    error: 'Forma de pagamento indisponível para esta compra. Escolha outra bandeira.',
  },
  '801': {
    error: 'Pagamento já está sendo processado. Aguarde a confirmação por e-mail.',
  },
};

const getPaymentFeedback = (detail?: string, code?: string): PaymentFeedback => {
  if (detail && PAYMENT_MESSAGES[detail]) {
    return PAYMENT_MESSAGES[detail];
  }
  if (code && PAYMENT_MESSAGES[code]) {
    return PAYMENT_MESSAGES[code];
  }
  return {};
};

export default function ModalAssinar({ isOpen, onClose }: ModalAssinarProps) {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    cpf: '',
    phone: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [infoMessage, setInfoMessage] = useState('');
  const [paymentStatus, setPaymentStatus] = useState<PaymentStatus>('idle');

  useEffect(() => {
    if (isOpen) {
      const publicKey = import.meta.env.VITE_MP_PUBLIC_KEY;
      if (publicKey) {
        initMercadoPago(publicKey);
      }
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) {
      setStep(1);
      setLoading(false);
      setForm({
        name: '',
        email: '',
        cpf: '',
        phone: '',
        password: '',
      });
      setError('');
      setInfoMessage('');
      setPaymentStatus('idle');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  async function handleCreateUser() {
    setLoading(true);
    setError('');
    setInfoMessage('');
    setPaymentStatus('idle');

    if (!form.name || !form.email || !form.cpf || !form.phone || !form.password) {
      setError('Preencha todos os campos para continuar.');
      setLoading(false);
      return;
    }

    if (!form.email.includes('@')) {
      setError('Digite um endereço de e-mail válido.');
      setLoading(false);
      return;
    }

    try {
      const { error: insertError } = await supabase.from('site_users').insert({
        name: form.name,
        email: form.email,
        cpf: form.cpf,
        phone: form.phone,
        password: form.password,
        status: 'pending_payment',
      });

      if (insertError) {
        if (insertError.code === '23505') {
          await supabase
            .from('site_users')
            .update({
              name: form.name,
              cpf: form.cpf,
              phone: form.phone,
              password: form.password,
              status: 'pending_payment',
            })
            .eq('email', form.email);
        } else {
          throw insertError;
        }
      }

      setStep(2);
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Erro ao criar cadastro. Tente novamente.');
    } finally {
      setLoading(false);
    }
  }

  const handlePayment = async (formData: any) => {
    setLoading(true);
    setError('');
    setInfoMessage('');
    setPaymentStatus('idle');

    try {
      const functionsUrl = import.meta.env.VITE_SUPABASE_FUNCTIONS_URL;
      const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

      if (!functionsUrl) {
        throw new Error('VITE_SUPABASE_FUNCTIONS_URL não configurada');
      }

      const response = await fetch(`${functionsUrl}/create-preference`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          apikey: supabaseAnonKey || '',
          Authorization: `Bearer ${supabaseAnonKey || ''}`,
        },
        body: JSON.stringify({
          email: form.email,
          name: form.name,
          cpf: form.cpf,
          phone: form.phone,
          formData,
        }),
      });

      const data = await response.json();

      const statusDetail = data.status_detail ?? data.payment?.status_detail;
      const causeCode = data.cause?.[0]?.code ?? data.payment?.cause?.[0]?.code;
      const status = (data.status ?? data.payment?.status ?? 'pending') as PaymentStatus;
      const feedback = getPaymentFeedback(statusDetail, causeCode);

      if (!response.ok || data.error) {
        const message =
          feedback.error ||
          data.error ||
          data.cause?.[0]?.description ||
          'Erro ao processar pagamento. Verifique os dados e tente novamente.';
        throw new Error(message);
      }

      setPaymentStatus(status);

      const normalizedStatus =
        status === 'approved' ? 'active' : status === 'rejected' ? 'rejected' : 'pending_payment';

      await supabase.from('site_users').update({ status: normalizedStatus }).eq('email', form.email);

      await supabase
        .from('site_subscriptions')
        .upsert(
          {
            email: form.email,
            plan: 'pro',
            status: status === 'approved' ? 'active' : 'pending',
            payment_id: data.id ?? data.payment?.id ?? null,
            created_at: new Date().toISOString(),
          },
          { onConflict: 'email' }
        );

      if (status === 'approved') {
        setInfoMessage(feedback.info || 'Pagamento aprovado! Redirecionando para o app...');
        setTimeout(() => {
          window.location.href = 'https://app.upvendus.com';
        }, 2000);
      } else if (status === 'in_process' || status === 'pending' || status === 'authorized') {
        setInfoMessage(
          feedback.info ||
            'Pagamento em análise. Você receberá um e-mail assim que for aprovado.'
        );
      } else if (status === 'in_mediation') {
        setInfoMessage(
          feedback.info || 'Pagamento em mediação. Nossa equipe entrará em contato por e-mail.'
        );
      } else {
        setError(
          feedback.error ||
            'Pagamento não aprovado. Verifique os dados do cartão ou utilize outra forma de pagamento.'
        );
      }
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Erro ao processar pagamento.');
      setPaymentStatus('rejected');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/70 backdrop-blur-md z-50">
      <div
        className="bg-gradient-to-br from-purple-700 to-orange-500 p-[1px] rounded-2xl shadow-2xl w-[90%] max-w-md"
        role="dialog"
        aria-modal="true"
      >
        <div className="bg-[#0d0d0d] p-6 rounded-2xl text-white">
          <h2 className="text-xl font-semibold mb-2 text-center">Assine o Vendus Pro</h2>
          <p className="text-sm text-gray-400 mb-5 text-center">
            R$45/mês • Pagamento seguro via Mercado Pago
          </p>

          {step === 1 && (
            <>
              <input
                type="text"
                placeholder="Nome completo"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full mb-2 p-3 rounded-md bg-neutral-800 text-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500 placeholder-gray-500"
                disabled={loading}
              />
              <input
                type="email"
                placeholder="E-mail"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full mb-2 p-3 rounded-md bg-neutral-800 text-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500 placeholder-gray-500"
                disabled={loading}
              />
              <input
                type="text"
                placeholder="CPF"
                value={form.cpf}
                onChange={(e) => setForm({ ...form, cpf: e.target.value })}
                className="w-full mb-2 p-3 rounded-md bg-neutral-800 text-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500 placeholder-gray-500"
                disabled={loading}
              />
              <input
                type="text"
                placeholder="Celular"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="w-full mb-2 p-3 rounded-md bg-neutral-800 text-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500 placeholder-gray-500"
                disabled={loading}
              />
              <input
                type="password"
                placeholder="Senha"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                className="w-full mb-4 p-3 rounded-md bg-neutral-800 text-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500 placeholder-gray-500"
                disabled={loading}
              />

              {error && <p className="text-red-500 text-sm mb-2 text-center">{error}</p>}

              <button
                onClick={handleCreateUser}
                disabled={loading}
                className="w-full bg-gradient-to-r from-orange-500 to-purple-600 py-2 rounded-md hover:opacity-90 transition disabled:cursor-not-allowed disabled:opacity-60 font-medium"
              >
                {loading ? 'Criando conta...' : 'Continuar para pagamento'}
              </button>
            </>
          )}

          {step === 2 && (
            <div>
              <h3 className="text-lg mb-4 text-center">Pagamento</h3>
              <div className="text-left mb-4">
                <CardPayment
                  initialization={{
                    amount: 45,
                    payer: { email: form.email },
                  }}
                  onSubmit={handlePayment}
                  customization={{
                    visual: {
                      theme: 'dark',
                    },
                  }}
                />
              </div>
              {infoMessage && (
                <p className="text-green-400 text-sm mb-2 text-center">{infoMessage}</p>
              )}
              {error && <p className="text-red-500 text-sm mb-2 text-center">{error}</p>}
              <button
                onClick={() => setStep(1)}
                className="text-sm text-gray-400 hover:text-white transition"
              >
                ← Voltar
              </button>
            </div>
          )}

          <button
            onClick={onClose}
            disabled={loading}
            className="mt-4 w-full text-sm text-gray-400 hover:text-white transition disabled:opacity-60"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}

