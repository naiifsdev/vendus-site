import { ArrowRight, BarChart3, TrendingUp, Users } from 'lucide-react';

interface HeroProps {
  onOpenSignup: () => void;
}

export default function Hero({ onOpenSignup }: HeroProps) {
  return (
    <section id="inicio" className="relative pt-32 pb-24 px-4 sm:px-6 lg:px-8 dark:bg-[#111115] light:bg-[#F9FAFB] overflow-hidden">
      {/* Grid texture background */}
      <div 
        className="absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }}
      ></div>
      {/* Radial gradient background - orange and purple */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute top-0 left-[70%] w-[1000px] h-[1000px] rounded-full blur-3xl"
          style={{ background: 'radial-gradient(circle, rgba(255, 107, 0, 0.1) 0%, transparent 70%)' }}
        ></div>
        <div 
          className="absolute top-[70%] left-[30%] w-[800px] h-[800px] rounded-full blur-3xl"
          style={{ background: 'radial-gradient(circle, rgba(123, 47, 247, 0.095) 0%, transparent 70%)' }}
        ></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
                <div className="space-y-6">
                  <h1 className="text-5xl sm:text-6xl lg:text-7xl font-title leading-tight dark:text-white light:text-[#0F0F11]">
                    Um sistema completo para quem vende online.
                  </h1>
                  <p className="text-xl sm:text-2xl dark:text-gray-300 light:text-gray-600 leading-relaxed">
                    Gestão de vendas, fornecedores, relatórios e lucros — com integração direta com Shopee e Mercado Livre.
                  </p>
                </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={onOpenSignup}
                className="group relative px-8 py-4 bg-gradient-to-r from-[#FF6B00] to-[#FF3C00] text-white rounded-xl font-semibold hover:brightness-125 hover:scale-[1.03] transition-all duration-300 flex items-center justify-center space-x-2 overflow-hidden glow-button"
              >
                <span className="relative z-10">Teste grátis 3 dias</span>
                <ArrowRight size={20} className="relative z-10" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#FF6B00] via-[#FF7A1A] to-[#FF6B00] bg-[length:200%_auto] animate-gradient opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </button>
              <a
                href="https://app.upvendus.com"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 bg-gradient-to-r from-[#7B2FF7] to-[#A370FF] text-white rounded-xl font-semibold hover:brightness-115 hover:scale-[1.02] transition-all flex items-center justify-center"
              >
                Entrar no sistema
              </a>
            </div>

                <div className="flex items-center space-x-8 pt-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold dark:text-white light:text-[#0F0F11]">3 dias</div>
                    <div className="text-sm dark:text-gray-300 light:text-gray-600">Grátis</div>
                  </div>
                  <div className="h-12 w-px dark:bg-white/10 light:bg-gray-300"></div>
                  <div className="text-center">
                    <div className="text-3xl font-bold dark:text-white light:text-[#0F0F11]">R$45</div>
                    <div className="text-sm dark:text-gray-300 light:text-gray-600">Por mês</div>
                  </div>
                  <div className="h-12 w-px dark:bg-white/10 light:bg-gray-300"></div>
                  <div className="text-center">
                    <div className="text-3xl font-bold dark:text-white light:text-[#0F0F11]">100%</div>
                    <div className="text-sm dark:text-gray-300 light:text-gray-600">Online</div>
                  </div>
                </div>
          </div>

          <div className="relative">
            {/* Neon light effect behind mockup */}
            <div 
              className="absolute -inset-4 rounded-3xl blur-2xl opacity-60"
              style={{ 
                background: 'radial-gradient(circle, rgba(255, 107, 0, 0.3) 0%, rgba(123, 47, 247, 0.19) 50%, transparent 100%)',
                filter: 'brightness(1.3)'
              }}
            ></div>
            
            <div className="relative dark:bg-[#1A1A24]/95 light:bg-white/95 backdrop-blur-lg rounded-3xl p-8 dark:border-[#2C2C33] light:border-gray-200 hover:border-[#FF6B00]/40 shadow-2xl glow-gradient transition-all duration-300">
              <div className="space-y-6">
                <div className="flex items-center justify-between pb-6 dark:border-white/10 light:border-gray-200 border-b">
                  <h3 className="font-semibold text-lg dark:text-white light:text-[#0F0F11]">Dashboard Vendus</h3>
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 rounded-full bg-red-400"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                    <div className="w-3 h-3 rounded-full bg-green-400"></div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="dark:bg-[#161620] light:bg-gray-50 rounded-xl p-4 dark:border-[#2C2C33] light:border-gray-200 border">
                    <BarChart3 size={24} className="mb-2 text-[#FF6B00] icon-glow" />
                    <div className="text-2xl font-bold dark:text-white light:text-[#0F0F11]">R$12.5k</div>
                    <div className="text-xs dark:text-gray-200 light:text-gray-600">Vendas do mês</div>
                  </div>
                  <div className="dark:bg-[#161620] light:bg-gray-50 rounded-xl p-4 dark:border-[#2C2C33] light:border-gray-200 border">
                    <TrendingUp size={24} className="mb-2 text-green-400" />
                    <div className="text-2xl font-bold dark:text-white light:text-[#0F0F11]">+28%</div>
                    <div className="text-xs dark:text-gray-200 light:text-gray-600">Crescimento</div>
                  </div>
                  <div className="dark:bg-[#161620] light:bg-gray-50 rounded-xl p-4 dark:border-[#2C2C33] light:border-gray-200 border">
                    <Users size={24} className="mb-2 text-[#7B2FF7]" />
                    <div className="text-2xl font-bold dark:text-white light:text-[#0F0F11]">342</div>
                    <div className="text-xs dark:text-gray-200 light:text-gray-600">Produtos</div>
                  </div>
                </div>

                <div className="dark:bg-[#161620] light:bg-gray-50 rounded-xl p-4 space-y-3 dark:border-[#2C2C33] light:border-gray-200 border">
                  <div className="flex items-center justify-between">
                    <span className="text-sm dark:text-gray-300 light:text-gray-600">Shopee</span>
                    <span className="text-sm font-semibold dark:text-white light:text-[#0F0F11]">R$7.2k</span>
                  </div>
                  <div className="w-full dark:bg-white/10 light:bg-gray-200 rounded-full h-2">
                    <div className="bg-gradient-to-r from-[#FF6B00] to-[#FF3C00] h-2 rounded-full" style={{ width: '58%' }}></div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm dark:text-gray-300 light:text-gray-600">Mercado Livre</span>
                    <span className="text-sm font-semibold dark:text-white light:text-[#0F0F11]">R$5.3k</span>
                  </div>
                  <div className="w-full dark:bg-white/10 light:bg-gray-200 rounded-full h-2">
                    <div className="bg-gradient-to-r from-[#7B2FF7] to-[#A370FF] h-2 rounded-full" style={{ width: '42%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
