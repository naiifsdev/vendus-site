import { useState } from 'react';
import { supabase } from '../lib/supabaseClient';

interface ModalTrialProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ModalTrial({ isOpen, onClose }: ModalTrialProps) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleStartTrial = async () => {
    setLoading(true);
    setError('');

    try {
      const email = `trial_${Date.now()}@trial.upvendus.com`;
      const password = crypto.randomUUID();

      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
      });
      if (authError) throw authError;

      const userEmail = authData?.user?.email;

      const trialStart = new Date();
      const trialEnd = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000);

      const { error: insertError } = await supabase.from('site_subscriptions').insert({
        email: userEmail,
        plan: 'trial',
        status: 'active',
        trial_start: trialStart.toISOString(),
        trial_end: trialEnd.toISOString(),
      });
      if (insertError) throw insertError;

      setSuccess(true);
      setTimeout(() => {
        window.location.href = 'https://app.upvendus.com';
      }, 1500);
    } catch (err) {
      console.error(err);
      setError('Erro ao iniciar o teste. Tente novamente.');
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
        <div className="bg-[#0d0d0d] p-6 rounded-2xl text-center">
          {!success ? (
            <>
              <h2 className="text-xl font-semibold mb-2 text-white">Teste grátis de 3 dias</h2>
              <p className="text-sm text-gray-400 mb-4">
                Sem cartão de crédito • Cancele quando quiser
              </p>

              {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

              <button
                onClick={handleStartTrial}
                disabled={loading}
                className="w-full bg-gradient-to-r from-orange-500 to-purple-600 hover:opacity-90 text-white py-2 rounded-md font-medium transition disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? 'Iniciando...' : 'Começar agora'}
              </button>

              <button
                onClick={onClose}
                disabled={loading}
                className="mt-3 text-sm text-gray-400 hover:text-white transition disabled:opacity-60"
              >
                Cancelar
              </button>
            </>
          ) : (
            <div className="text-white">
              <h3 className="text-lg font-semibold mb-2">Teste iniciado!</h3>
              <p className="text-gray-400">Redirecionando para o app...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}


