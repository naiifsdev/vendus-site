import { Instagram, Linkedin, Mail } from 'lucide-react';

export default function Footer() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer id="contato" className="bg-black py-16 px-4 sm:px-6 lg:px-8 relative">
      {/* Gradient line at top */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#FF6B00] via-[#7B2FF7] to-transparent opacity-60"></div>
      
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-[#FF6B00] to-[#7B2FF7] rounded-lg flex items-center justify-center shadow-lg glow-gradient">
                <span className="text-white font-bold text-xl">V</span>
              </div>
              <span className="text-2xl font-title text-white">Vendus</span>
            </div>
            <p className="text-gray-300 leading-relaxed max-w-md">
              O Vendus é o sistema inteligente para quem vende online — controle, automação e crescimento em um só lugar.
            </p>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4 text-white">Links Rápidos</h3>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => scrollToSection('inicio')}
                  className="text-gray-300 hover:text-white transition-colors text-sm"
                >
                  Início
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('recursos')}
                  className="text-gray-300 hover:text-white transition-colors text-sm"
                >
                  Recursos
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('calculadora')}
                  className="text-gray-300 hover:text-white transition-colors text-sm"
                >
                  Calculadora
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('planos')}
                  className="text-gray-300 hover:text-white transition-colors text-sm"
                >
                  Planos
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4 text-white">Contato</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="mailto:contato@upvendus.com"
                  className="text-gray-300 hover:text-white transition-colors flex items-center space-x-2 text-sm"
                >
                  <Mail size={16} />
                  <span>contato@upvendus.com</span>
                </a>
              </li>
            </ul>
            <div className="flex space-x-4 mt-6">
              <a
                href="#"
                className="w-10 h-10 bg-white/5 hover:bg-[#FF6B00] rounded-lg flex items-center justify-center transition-all border border-white/10 hover:border-[#FF6B00]"
              >
                <Instagram size={20} className="text-gray-300 hover:text-[#FF6B00] transition-colors" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-white/5 hover:bg-[#7B2FF7] rounded-lg flex items-center justify-center transition-all border border-white/10 hover:border-[#7B2FF7]"
              >
                <Linkedin size={20} className="text-gray-300 hover:text-[#7B2FF7] transition-colors" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 text-center text-gray-300 text-sm">
          <p>© 2025 Vendus. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
