import { Menu, X } from 'lucide-react';
import { useState } from 'react';

interface HeaderProps {
  onOpenSignup: () => void;
}

export default function Header({ onOpenSignup }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 dark:bg-black/60 light:bg-white/80 backdrop-blur-md dark:border-white/10 light:border-black/5 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <button onClick={() => scrollToSection('inicio')} className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-[#FF6B00] to-[#7B2FF7] rounded-lg flex items-center justify-center shadow-lg glow-gradient">
                <span className="text-white font-bold text-lg">V</span>
              </div>
              <span className="text-xl font-title dark:text-white light:text-[#0F0F11]">Vendus</span>
            </button>
          </div>

          <nav className="hidden md:flex items-center space-x-8">
            <button onClick={() => scrollToSection('inicio')} className="dark:text-[#9CA3AF] light:text-[#4B5563] dark:hover:text-white light:hover:text-[#0F0F11] transition-colors text-sm font-medium">
              Início
            </button>
            <button onClick={() => scrollToSection('recursos')} className="dark:text-[#9CA3AF] light:text-[#4B5563] dark:hover:text-white light:hover:text-[#0F0F11] transition-colors text-sm font-medium">
              Recursos
            </button>
            <button onClick={() => scrollToSection('calculadora')} className="dark:text-[#9CA3AF] light:text-[#4B5563] dark:hover:text-white light:hover:text-[#0F0F11] transition-colors text-sm font-medium">
              Calculadora
            </button>
            <button onClick={() => scrollToSection('planos')} className="dark:text-[#9CA3AF] light:text-[#4B5563] dark:hover:text-white light:hover:text-[#0F0F11] transition-colors text-sm font-medium">
              Planos
            </button>
            <button onClick={() => scrollToSection('contato')} className="dark:text-[#9CA3AF] light:text-[#4B5563] dark:hover:text-white light:hover:text-[#0F0F11] transition-colors text-sm font-medium">
              Contato
            </button>
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            <a
              href="https://app.upvendus.com"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-gradient-to-r from-[#7B2FF7] to-[#A370FF] text-white rounded-lg hover:brightness-115 hover:scale-[1.02] transition-all font-medium text-sm"
            >
              Entrar
            </a>
            <button
              onClick={onOpenSignup}
              className="group relative px-4 py-2 bg-gradient-to-r from-[#FF6B00] to-[#FF3C00] text-white font-semibold rounded-lg hover:brightness-125 hover:scale-[1.03] transition-all text-sm overflow-hidden glow-button"
            >
              <span className="relative z-10">Teste grátis 3 dias</span>
              <div className="absolute inset-0 bg-gradient-to-r from-[#FF6B00] via-[#FF7A1A] to-[#FF6B00] bg-[length:200%_auto] animate-gradient opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </button>
            <button
              onClick={() => scrollToSection('planos')}
              className="px-4 py-2 bg-transparent border border-[#FF6B00]/60 text-[#FF6B00] rounded-lg hover:bg-[#FF6B00]/10 hover:scale-[1.03] transition-all font-medium text-sm glow-button-hover"
            >
              Assinar R$45/mês
            </button>
          </div>

          <div className="md:hidden flex items-center space-x-2">
            <button
              className="dark:text-[#9CA3AF] light:text-[#4B5563] dark:hover:text-white light:hover:text-[#0F0F11] transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden dark:bg-black/80 light:bg-white/95 backdrop-blur-md dark:border-white/10 light:border-black/5 border-t">
          <div className="px-4 py-4 space-y-3">
            <button onClick={() => scrollToSection('inicio')} className="block w-full text-left dark:text-[#9CA3AF] light:text-[#4B5563] dark:hover:text-white light:hover:text-[#0F0F11] py-2 transition-colors">
              Início
            </button>
            <button onClick={() => scrollToSection('recursos')} className="block w-full text-left dark:text-[#9CA3AF] light:text-[#4B5563] dark:hover:text-white light:hover:text-[#0F0F11] py-2 transition-colors">
              Recursos
            </button>
            <button onClick={() => scrollToSection('calculadora')} className="block w-full text-left dark:text-[#9CA3AF] light:text-[#4B5563] dark:hover:text-white light:hover:text-[#0F0F11] py-2 transition-colors">
              Calculadora
            </button>
            <button onClick={() => scrollToSection('planos')} className="block w-full text-left dark:text-[#9CA3AF] light:text-[#4B5563] dark:hover:text-white light:hover:text-[#0F0F11] py-2 transition-colors">
              Planos
            </button>
            <button onClick={() => scrollToSection('contato')} className="block w-full text-left dark:text-[#9CA3AF] light:text-[#4B5563] dark:hover:text-white light:hover:text-[#0F0F11] py-2 transition-colors">
              Contato
            </button>
            <hr className="dark:border-white/10 light:border-black/5" />
            <a
              href="https://app.upvendus.com"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full text-left dark:text-[#9CA3AF] light:text-[#4B5563] dark:hover:text-white light:hover:text-[#0F0F11] py-2 font-medium transition-colors"
            >
              Entrar
            </a>
            <button
              onClick={onOpenSignup}
              className="block w-full px-4 py-2 bg-gradient-to-r from-[#FF6B00] to-[#FF3C00] text-white font-semibold rounded-lg hover:brightness-125 hover:scale-[1.03] transition-all text-center glow-button"
            >
              Teste grátis 3 dias
            </button>
            <button
              onClick={() => {
                scrollToSection('planos');
                setIsMobileMenuOpen(false);
              }}
              className="block w-full px-4 py-2 bg-transparent border border-[#FF6B00]/60 text-[#FF6B00] rounded-lg hover:bg-[#FF6B00]/10 hover:scale-[1.03] transition-all font-medium text-center glow-button-hover"
            >
              Assinar R$45/mês
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
