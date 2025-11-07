import { useState } from 'react';
import { Calculator as CalcIcon, TrendingUp, DollarSign } from 'lucide-react';

export default function Calculator() {
  const [values, setValues] = useState({
    cost: '',
    addition: '',
    platformFee: '',
    taxes: '',
    fixedCosts: '',
    profitMargin: '',
  });

  const [results, setResults] = useState<{
    finalPrice: number;
    profitPerSale: number;
  } | null>(null);

  const handleCalculate = () => {
    const cost = parseFloat(values.cost) || 0;
    const addition = parseFloat(values.addition) || 0;
    const platformFee = parseFloat(values.platformFee) || 0;
    const taxes = parseFloat(values.taxes) || 0;
    const fixedCosts = parseFloat(values.fixedCosts) || 0;
    const profitMargin = parseFloat(values.profitMargin) || 0;

    const baseCost = cost + addition + fixedCosts;
    const finalPrice = baseCost / (1 - (platformFee + taxes + profitMargin) / 100);
    const profitPerSale = finalPrice - baseCost - (finalPrice * (platformFee + taxes) / 100);

    setResults({
      finalPrice: Math.round(finalPrice * 100) / 100,
      profitPerSale: Math.round(profitPerSale * 100) / 100,
    });
  };

  const handleInputChange = (field: string, value: string) => {
    setValues(prev => ({ ...prev, [field]: value }));
  };

  return (
    <section id="calculadora" className="py-24 px-4 sm:px-6 lg:px-8 dark:bg-[#111115] light:bg-[#F9FAFB] relative overflow-hidden">
      {/* Grid texture background */}
      <div 
        className="absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }}
      ></div>
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[#FF6B00] to-[#7B2FF7] rounded-2xl mb-4 shadow-lg glow-gradient">
            <CalcIcon size={32} className="text-white" />
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-title dark:text-white light:text-[#0F0F11] mb-4">
            Calculadora de Preços
          </h2>
          <p className="text-xl dark:text-gray-300 light:text-gray-600 max-w-2xl mx-auto">
            Descubra o preço ideal para seus produtos e maximize seus lucros
          </p>
        </div>

        <div className="dark:bg-[#141419]/90 light:bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl dark:border-[#2C2C33] light:border-gray-200 overflow-hidden glow-gradient">
          <div className="grid lg:grid-cols-2 gap-8 p-8 lg:p-12">
            <div className="space-y-6">
              <h3 className="text-2xl font-bold dark:text-white light:text-[#0F0F11] mb-6">Informe seus custos</h3>

              <div>
                <label className="block text-sm font-semibold dark:text-gray-300 light:text-gray-600 mb-2">
                  Custo do produto (R$)
                </label>
                <input
                  type="number"
                  value={values.cost}
                  onChange={(e) => handleInputChange('cost', e.target.value)}
                  className="w-full px-4 py-3 rounded-lg dark:bg-[#0E0E12] light:bg-gray-50 dark:border-white/15 light:border-gray-300 dark:text-white light:text-[#0F0F11] placeholder:text-gray-400 focus:ring-2 focus:ring-[#7B2FF7] focus:border-[#7B2FF7] outline-none transition-all"
                  placeholder="0.00"
                  step="0.01"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold dark:text-gray-300 light:text-gray-600 mb-2">
                  Acréscimo (R$)
                </label>
                <input
                  type="number"
                  value={values.addition}
                  onChange={(e) => handleInputChange('addition', e.target.value)}
                  className="w-full px-4 py-3 rounded-lg dark:bg-[#0E0E12] light:bg-gray-50 dark:border-white/15 light:border-gray-300 dark:text-white light:text-[#0F0F11] placeholder:text-gray-400 focus:ring-2 focus:ring-[#7B2FF7] focus:border-[#7B2FF7] outline-none transition-all"
                  placeholder="0.00"
                  step="0.01"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold dark:text-gray-300 light:text-gray-600 mb-2">
                  Taxa da plataforma (%)
                </label>
                <input
                  type="number"
                  value={values.platformFee}
                  onChange={(e) => handleInputChange('platformFee', e.target.value)}
                  className="w-full px-4 py-3 rounded-lg dark:bg-[#0E0E12] light:bg-gray-50 dark:border-white/15 light:border-gray-300 dark:text-white light:text-[#0F0F11] placeholder:text-gray-400 focus:ring-2 focus:ring-[#7B2FF7] focus:border-[#7B2FF7] outline-none transition-all"
                  placeholder="0.00"
                  step="0.01"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold dark:text-gray-300 light:text-gray-600 mb-2">
                  Impostos (%)
                </label>
                <input
                  type="number"
                  value={values.taxes}
                  onChange={(e) => handleInputChange('taxes', e.target.value)}
                  className="w-full px-4 py-3 rounded-lg dark:bg-[#0E0E12] light:bg-gray-50 dark:border-white/15 light:border-gray-300 dark:text-white light:text-[#0F0F11] placeholder:text-gray-400 focus:ring-2 focus:ring-[#7B2FF7] focus:border-[#7B2FF7] outline-none transition-all"
                  placeholder="0.00"
                  step="0.01"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold dark:text-gray-300 light:text-gray-600 mb-2">
                  Custos fixos (R$)
                </label>
                <input
                  type="number"
                  value={values.fixedCosts}
                  onChange={(e) => handleInputChange('fixedCosts', e.target.value)}
                  className="w-full px-4 py-3 rounded-lg dark:bg-[#0E0E12] light:bg-gray-50 dark:border-white/15 light:border-gray-300 dark:text-white light:text-[#0F0F11] placeholder:text-gray-400 focus:ring-2 focus:ring-[#7B2FF7] focus:border-[#7B2FF7] outline-none transition-all"
                  placeholder="0.00"
                  step="0.01"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold dark:text-gray-300 light:text-gray-600 mb-2">
                  Margem de lucro (%)
                </label>
                <input
                  type="number"
                  value={values.profitMargin}
                  onChange={(e) => handleInputChange('profitMargin', e.target.value)}
                  className="w-full px-4 py-3 rounded-lg dark:bg-[#0E0E12] light:bg-gray-50 dark:border-white/15 light:border-gray-300 dark:text-white light:text-[#0F0F11] placeholder:text-gray-400 focus:ring-2 focus:ring-[#7B2FF7] focus:border-[#7B2FF7] outline-none transition-all"
                  placeholder="0.00"
                  step="0.01"
                />
              </div>

              <button
                onClick={handleCalculate}
                className="group relative w-full px-6 py-4 bg-gradient-to-r from-[#7B2FF7] to-[#A370FF] text-white rounded-lg font-semibold hover:brightness-115 hover:scale-[1.03] transition-all flex items-center justify-center space-x-2 overflow-hidden"
                style={{ boxShadow: '0 0 20px rgba(123, 47, 247, 0.25)' }}
              >
                <CalcIcon size={20} className="relative z-10" />
                <span className="relative z-10">Calcular</span>
                <div className="absolute inset-0 bg-gradient-to-r from-[#7B2FF7] via-[#9255FF] to-[#7B2FF7] bg-[length:200%_auto] animate-gradient opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </button>
            </div>

            <div className="space-y-6">
              <h3 className="text-2xl font-bold dark:text-white light:text-[#0F0F11] mb-6">Resultados</h3>

              {results ? (
                <div className="space-y-4">
                  <div className="dark:bg-[#1A1A24] light:bg-gray-50 rounded-2xl p-6 dark:border-white/15 light:border-gray-200">
                    <div className="flex items-center space-x-3 mb-2">
                      <DollarSign size={24} className="text-[#FF6B00]" />
                      <span className="text-sm font-semibold dark:text-gray-300 light:text-gray-600">Valor final</span>
                    </div>
                    <div className="text-4xl font-bold text-[#FF6B00]">
                      R$ {results.finalPrice.toFixed(2)}
                    </div>
                  </div>

                  <div className="dark:bg-[#1A1A24] light:bg-gray-50 rounded-2xl p-6 dark:border-white/15 light:border-gray-200">
                    <div className="flex items-center space-x-3 mb-2">
                      <TrendingUp size={24} className="text-green-400" />
                      <span className="text-sm font-semibold dark:text-gray-300 light:text-gray-600">Lucro por venda</span>
                    </div>
                    <div className="text-4xl font-bold text-green-400">
                      R$ {results.profitPerSale.toFixed(2)}
                    </div>
                  </div>

                  <div className="dark:bg-[#1A1A24] light:bg-gray-50 rounded-2xl p-6 dark:border-white/15 light:border-gray-200">
                    <p className="dark:text-gray-300 light:text-gray-600 leading-relaxed">
                      <span className="font-bold dark:text-white light:text-[#0F0F11]">Quer automatizar esse cálculo e integrar com Shopee?</span>
                      <br />
                      Crie sua conta grátis no Vendus e tenha acesso a calculadoras automáticas, controle de estoque e muito mais.
                    </p>
                    <button
                      onClick={() => {
                        const element = document.getElementById('planos');
                        if (element) element.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="mt-4 w-full px-6 py-3 bg-gradient-to-r from-[#FF6B00] to-[#FF3C00] text-white rounded-lg font-semibold hover:brightness-125 hover:scale-[1.03] transition-all glow-button"
                    >
                      Crie sua conta grátis no Vendus
                    </button>
                  </div>
                </div>
              ) : (
                <div className="h-full flex items-center justify-center">
                  <div className="text-center dark:text-gray-300 light:text-gray-600">
                    <CalcIcon size={64} className="mx-auto mb-4 opacity-30" />
                    <p className="text-lg">Preencha os campos e clique em calcular para ver os resultados</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
