import { Check, Zap } from 'lucide-react';

interface PricingProps {
  onFreeTrial: () => void;
  onCheckout: () => void;
}

export default function Pricing({ onFreeTrial, onCheckout }: PricingProps) {
  const features = [
    'Acesso completo a todas as funções',
    'Integração com Shopee e Mercado Livre',
    'Controle manual para outros marketplaces',
    'Gestão de fornecedores e pagamentos',
    'Relatórios e gráficos em tempo real',
    'Calculadora de preços automática',
    'Ambiente multiusuário seguro',
    'Atualizações e suporte prioritário',
  ];

  return (
    <section id="planos" className="py-24 px-4 sm:px-6 lg:px-8 dark:bg-gradient-to-br dark:from-[#111115] dark:to-[#1A1A1F] light:bg-[#F9FAFB] relative overflow-hidden">
      {/* Grid texture background */}
      <div 
        className="absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }}
      ></div>
      {/* Glow effect around card */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-3xl opacity-40"
          style={{ background: 'radial-gradient(circle, rgba(255, 107, 0, 0.3) 0%, rgba(123, 47, 247, 0.19) 50%, transparent 70%)' }}
        ></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-title mb-4 text-white">
            Um plano completo para seu negócio crescer
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Sem pegadinhas, sem limitações. Teste grátis por 3 dias e veja como o Vendus transforma sua gestão.
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <div className="relative bg-[#1A1A24]/95 backdrop-blur-xl rounded-3xl p-8 lg:p-12 border border-[#2C2C33] hover:border-[#FF6B00]/40 shadow-2xl overflow-hidden glow-orange-lg transition-all duration-300">
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <div className="flex items-center space-x-3 mb-2">
                    <Zap size={32} className="text-[#FF6B00] icon-glow" />
                    <h3 className="text-3xl font-title text-white">Vendus Pro</h3>
                  </div>
                  <p className="text-gray-300">Plano completo para gestão profissional</p>
                </div>
              </div>

              <div className="mb-8">
                <div className="flex items-baseline space-x-2">
                  <span className="text-5xl lg:text-6xl font-title text-white">R$ 45</span>
                  <span className="text-2xl text-gray-300">/mês</span>
                </div>
                <div className="mt-2 inline-block px-3 py-1 bg-[#FF6B00]/20 text-[#FF6B00] rounded-full text-sm font-semibold border border-[#FF6B00]/30">
                  3 dias grátis
                </div>
              </div>

              <div className="space-y-4 mb-8">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center mt-0.5 border border-green-500/30">
                      <Check size={16} className="text-green-400" />
                    </div>
                    <span className="text-white">{feature}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-3">
                <button
                  onClick={onCheckout}
                  className="group relative w-full px-8 py-4 bg-gradient-to-r from-[#FF6B00] to-[#FF3C00] text-white rounded-xl font-bold text-lg hover:brightness-125 hover:scale-[1.03] transition-all overflow-hidden glow-button"
                >
                  <span className="relative z-10">Assinar agora</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-[#FF6B00] via-[#FF7A1A] to-[#FF6B00] bg-[length:200%_auto] animate-gradient opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </button>
                <button
                  onClick={onFreeTrial}
                  className="group relative w-full px-8 py-4 bg-gradient-to-r from-[#7B2FF7] to-[#A370FF] text-white rounded-xl font-semibold hover:brightness-115 hover:scale-[1.02] transition-all overflow-hidden"
                  style={{ boxShadow: '0 0 20px rgba(123, 47, 247, 0.25)' }}
                >
                  <span className="relative z-10">Testar grátis 3 dias</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-[#7B2FF7] via-[#9255FF] to-[#7B2FF7] bg-[length:200%_auto] animate-gradient opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </button>
              </div>

              <p className="text-center text-sm text-gray-300 mt-6">
                Cancele quando quiser. Sem taxas de cancelamento.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
