import { useState } from 'react';
import { Link } from 'react-router-dom';
import { registerPendingSubscription } from '../lib/siteSubscriptions';

export default function Assinar() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    if (!email || !email.includes('@')) {
      window.alert('Digite um e-mail válido.');
      return;
    }

    const accessToken = import.meta.env.VITE_MP_ACCESS_TOKEN;

    if (!accessToken) {
      window.alert('Credenciais do Mercado Pago não configuradas.');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('https://api.mercadopago.com/checkout/preferences', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items: [
            {
              title: 'Assinatura Vendus Pro',
              description: 'Acesso completo ao sistema Vendus',
              quantity: 1,
              currency_id: 'BRL',
              unit_price: 45,
            },
          ],
          payer: { email },
          back_urls: {
            success: 'https://app.upvendus.com/success',
            failure: 'https://upvendus.com/failure',
            pending: 'https://upvendus.com/pending',
          },
          auto_return: 'approved',
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Erro ao criar checkout no Mercado Pago:', errorData);
        window.alert('Não foi possível iniciar o pagamento. Verifique as credenciais.');
        setLoading(false);
        return;
      }

      const data = await response.json();

      if (data.init_point) {
        const result = await registerPendingSubscription(email, data.id ?? null);
        if (!result.success && result.error) {
          console.warn('Não foi possível registrar a assinatura no Supabase:', result.error);
        }

        window.location.href = data.init_point;
      } else {
        console.error('Resposta inesperada do Mercado Pago:', data);
        window.alert('Não foi possível abrir o checkout. Tente novamente.');
      }
    } catch (error) {
      console.error('Erro inesperado ao criar checkout:', error);
      window.alert('Erro inesperado ao criar pagamento.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0D0D12] text-white flex items-center justify-center px-4 py-12">
      <div className="relative w-full max-w-3xl">
        <div className="absolute -inset-20 bg-gradient-to-br from-[#7B2FF7]/20 via-transparent to-[#FF6B00]/10 blur-3xl opacity-50 pointer-events-none"></div>

        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#111115]/80 shadow-[0_0_50px_-20px_rgba(255,107,0,0.6)] backdrop-blur-xl">
          <div className="px-8 py-10 md:px-12 md:py-14 flex flex-col lg:flex-row gap-12">
            <div className="flex-1 space-y-6">
              <span className="inline-flex items-center rounded-full border border-[#FF6B00]/40 bg-[#FF6B00]/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-[#FF6B00]">
                Plano Vendus Pro
              </span>
              <h1 className="text-3xl md:text-4xl font-title leading-tight">
                Assine o Vendus Pro e potencialize a gestão das suas vendas
              </h1>
              <p className="text-gray-300 text-base leading-relaxed">
                R$ 45/mês — acesso ilimitado ao painel completo do Vendus, integrações com marketplaces, calculadora inteligente e suporte prioritário.
              </p>
              <ul className="space-y-3 text-sm text-gray-300">
                <li className="flex items-center gap-3">
                  <span className="h-2 w-2 rounded-full bg-[#FF6B00]"></span>
                  Mercado Pago como gateway seguro
                </li>
                <li className="flex items-center gap-3">
                  <span className="h-2 w-2 rounded-full bg-[#7B2FF7]"></span>
                  Cancelamento a qualquer momento
                </li>
                <li className="flex items-center gap-3">
                  <span className="h-2 w-2 rounded-full bg-green-400"></span>
                  Teste grátis de 3 dias antes da cobrança
                </li>
              </ul>

              <Link
                to="/"
                className="inline-flex text-sm text-gray-400 transition-colors hover:text-white"
              >
                ← Voltar para a página inicial
              </Link>
            </div>

            <div className="w-full max-w-sm mx-auto rounded-2xl border border-white/15 bg-[#161620]/90 p-6 shadow-[0_0_35px_-15px_rgba(123,47,247,0.5)]">
              <h2 className="text-xl font-semibold text-white mb-2">Iniciar assinatura</h2>
              <p className="text-sm text-gray-400">
                Informe seu e-mail para gerar o checkout seguro via Mercado Pago.
              </p>

              <label className="mt-6 block text-left text-xs font-semibold uppercase tracking-wide text-gray-400">
                E-mail
              </label>
              <input
                type="email"
                placeholder="seu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-2 w-full rounded-lg border border-white/10 bg-[#0D0D12] px-4 py-3 text-gray-200 placeholder:text-gray-500 focus:border-[#FF6B00] focus:outline-none focus:ring-2 focus:ring-[#FF6B00]/40 transition-all"
              />

              <button
                onClick={handleCheckout}
                disabled={loading}
                className="mt-6 w-full rounded-lg bg-gradient-to-r from-[#FF6B00] to-[#FF3C00] px-6 py-3 text-sm font-semibold text-white shadow-[0_0_25px_rgba(255,107,0,0.35)] transition-all hover:brightness-110 hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-70"
              >
                {loading ? 'Carregando...' : 'Assinar agora'}
              </button>

              <p className="mt-4 text-center text-xs text-gray-400">
                Pagamento seguro via Mercado Pago. Você será redirecionado para finalizar a assinatura.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}



