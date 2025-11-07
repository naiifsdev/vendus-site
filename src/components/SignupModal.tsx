import { X } from 'lucide-react';
import { useEffect } from 'react';

interface SignupModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SignupModal({ isOpen, onClose }: SignupModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={onClose}></div>

      <div className="relative bg-[#1A1A24]/95 backdrop-blur-xl rounded-2xl shadow-2xl max-w-md w-full p-8 border border-[#2C2C33] glow-gradient">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-300 hover:text-white transition-colors"
        >
          <X size={24} />
        </button>

        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-[#FF6B00] to-[#7B2FF7] rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg glow-gradient">
            <span className="text-white font-bold text-2xl">V</span>
          </div>
          <h2 className="text-3xl font-title text-white mb-2">Comece grátis agora</h2>
          <p className="text-gray-300">3 dias de teste sem compromisso</p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-2">
              Nome completo
            </label>
            <input
              type="text"
              className="w-full px-4 py-3 rounded-lg dark:bg-[#0E0E12] light:bg-gray-50 dark:border-white/15 light:border-gray-300 dark:text-white light:text-[#0F0F11] placeholder:text-gray-400 focus:ring-2 focus:ring-[#7B2FF7] focus:border-[#7B2FF7] outline-none transition-all"
              placeholder="Seu nome"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-2">
              E-mail
            </label>
            <input
              type="email"
              className="w-full px-4 py-3 rounded-lg dark:bg-[#0E0E12] light:bg-gray-50 dark:border-white/15 light:border-gray-300 dark:text-white light:text-[#0F0F11] placeholder:text-gray-400 focus:ring-2 focus:ring-[#7B2FF7] focus:border-[#7B2FF7] outline-none transition-all"
              placeholder="seu@email.com"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-2">
              Senha
            </label>
            <input
              type="password"
              className="w-full px-4 py-3 rounded-lg dark:bg-[#0E0E12] light:bg-gray-50 dark:border-white/15 light:border-gray-300 dark:text-white light:text-[#0F0F11] placeholder:text-gray-400 focus:ring-2 focus:ring-[#7B2FF7] focus:border-[#7B2FF7] outline-none transition-all"
              placeholder="Crie uma senha"
            />
          </div>

          <button className="group relative w-full px-6 py-4 bg-gradient-to-r from-[#FF6B00] to-[#FF3C00] text-white rounded-lg font-bold hover:brightness-125 hover:scale-[1.03] transition-all overflow-hidden glow-button">
            <span className="relative z-10">Criar conta grátis</span>
            <div className="absolute inset-0 bg-gradient-to-r from-[#FF6B00] via-[#FF7A1A] to-[#FF6B00] bg-[length:200%_auto] animate-gradient opacity-0 group-hover:opacity-100 transition-opacity"></div>
          </button>

          <p className="text-center text-sm text-gray-300">
            Já tem uma conta?{' '}
            <a href="https://app.upvendus.com" className="text-[#7B2FF7] hover:text-[#9255FF] font-semibold transition-colors">
              Faça login
            </a>
          </p>
        </div>

        <div className="mt-6 pt-6 border-t border-white/10">
          <div className="flex items-center justify-center space-x-2 text-sm text-gray-300">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span>Sem cartão de crédito • Cancele quando quiser</span>
          </div>
        </div>
      </div>
    </div>
  );
}
