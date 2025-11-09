import { getSupabaseClient, isSupabaseConfigured } from './supabaseClient';

const TRIAL_DURATION_MS = 3 * 24 * 60 * 60 * 1000;

interface ActionResult {
  success: boolean;
  error?: string;
}

export async function createSiteTrial(email: string): Promise<ActionResult> {
  if (!isSupabaseConfigured) {
    return {
      success: false,
      error: 'Configuração do Supabase ausente. Defina VITE_SUPABASE_URL e VITE_SUPABASE_ANON_KEY.',
    };
  }

  const supabase = getSupabaseClient();
  if (!supabase) {
    return {
      success: false,
      error: 'Não foi possível inicializar o cliente do Supabase. Verifique as configurações.',
    };
  }

  const trialStart = new Date();
  const trialEnd = new Date(trialStart.getTime() + TRIAL_DURATION_MS);

  const { error } = await supabase.from('site_subscriptions').insert({
    email,
    plan: 'trial',
    status: 'active',
    trial_start: trialStart.toISOString(),
    trial_end: trialEnd.toISOString(),
  });

  if (error) {
    return {
      success: false,
      error: error.message ?? 'Erro desconhecido ao registrar o teste grátis.',
    };
  }

  return { success: true };
}

export async function registerPendingSubscription(
  email: string,
  paymentId?: string | null
): Promise<ActionResult> {
  if (!isSupabaseConfigured) {
    return {
      success: false,
      error: 'Configuração do Supabase ausente. Registro da assinatura não foi realizado.',
    };
  }

  const supabase = getSupabaseClient();
  if (!supabase) {
    return {
      success: false,
      error: 'Não foi possível inicializar o cliente do Supabase ao registrar a assinatura.',
    };
  }

  const { error } = await supabase.from('site_subscriptions').insert({
    email,
    plan: 'vendus_pro',
    status: 'pending',
    payment_id: paymentId ?? null,
  });

  if (error) {
    return {
      success: false,
      error: error.message ?? 'Erro desconhecido ao registrar assinatura no Supabase.',
    };
  }

  return { success: true };
}



