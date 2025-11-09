import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { email, name, cpf, phone, formData } = await req.json();

    if (!formData?.token) {
      return new Response(JSON.stringify({ error: 'Dados do cartão ausentes.' }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      });
    }

    const token = Deno.env.get('MERCADOPAGO_ACCESS_TOKEN');

    if (!token) {
      return new Response(
        JSON.stringify({ error: 'MERCADOPAGO_ACCESS_TOKEN não configurado' }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 500,
        }
      );
    }

    const normalizedCpf = (formData.identificationNumber || cpf || '').replace(/\D/g, '');
    const normalizedPhone = (phone || '').toString().replace(/\D/g, '');

    const nameParts = (name || '').trim().split(/\s+/).filter(Boolean);
    const [firstName, ...restName] = nameParts;

    const paymentPayload: Record<string, unknown> = {
      transaction_amount: 45,
      token: formData.token,
      description: 'Assinatura Vendus Pro',
      installments: Number(formData.installments) || 1,
      payment_method_id: formData.paymentMethodId,
      payer: {
        email,
        first_name: firstName,
        last_name: restName.length ? restName.join(' ') : undefined,
        identification:
          normalizedCpf.length > 0
            ? {
                type: formData.identificationType || 'CPF',
                number: normalizedCpf,
              }
            : undefined,
        phone: normalizedPhone.length > 0 ? { number: normalizedPhone } : undefined,
      },
    };

    if (formData.issuerId) {
      paymentPayload.issuer_id = formData.issuerId;
    }

    const response = await fetch('https://api.mercadopago.com/v1/payments', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
        'X-Idempotency-Key': crypto.randomUUID(),
      },
      body: JSON.stringify(paymentPayload),
    });

    const payment = await response.json();

    if (!response.ok) {
      return new Response(
        JSON.stringify({
          error:
            payment.message ||
            payment.cause?.[0]?.description ||
            'Erro ao processar pagamento',
          cause: payment.cause,
          status: payment.status,
        }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: response.status,
        }
      );
    }

    return new Response(
      JSON.stringify({
        id: payment.id,
        status: payment.status,
        status_detail: payment.status_detail,
        payment,
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    );
  } catch (err) {
    console.error('Erro na função create-preference:', err);
    return new Response(JSON.stringify({ error: 'Erro ao processar pagamento' }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500,
    });
  }
});

