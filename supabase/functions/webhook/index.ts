import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

serve(async (req) => {
  try {
    const event = await req.json();
    const payment = event?.data || {};

    if (payment.status === 'approved') {
      const payerEmail = payment.payer?.email;

      if (payerEmail) {
        // Atualiza site_subscriptions (se existir)
        await supabase
          .from('site_subscriptions')
          .update({ status: 'active' })
          .eq('email', payerEmail)
          .eq('status', 'pending');

        // Atualiza site_users
        const { error: userError } = await supabase
          .from('site_users')
          .update({ status: 'active' })
          .eq('email', payerEmail)
          .eq('status', 'pending_payment');

        if (userError) {
          console.error('Erro ao atualizar usuário:', userError);
        }
      }
    }

    return new Response(JSON.stringify({ success: true }), {
      headers: { 'Content-Type': 'application/json' },
      status: 200,
    });
  } catch (err) {
    console.error('Erro no webhook:', err);
    return new Response(JSON.stringify({ error: 'Erro ao processar webhook' }), {
      headers: { 'Content-Type': 'application/json' },
      status: 500,
    });
  }
});

