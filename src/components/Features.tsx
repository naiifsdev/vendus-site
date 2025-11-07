import {
  BarChart3,
  Zap,
  Handshake,
  Users,
  Calculator,
  TrendingUp,
  Package,
  DollarSign,
  Target,
  MessageCircle,
  Sparkles,
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function Features() {
  const features = [
    {
      icon: BarChart3,
      title: 'Controle unificado de vendas',
      description: 'Gerencie todas as suas vendas em Shopee, Mercado Livre, loja própria e outros marketplaces de forma centralizada e automatizada.',
      gradient: 'from-purple-500 via-purple-600 to-purple-700',
    },
    {
      icon: Zap,
      title: 'Integração API automática',
      description: 'Conexão direta com Shopee e Mercado Livre. Seus produtos, pedidos e estoques são sincronizados em tempo real.',
      gradient: 'from-orange-500 via-orange-600 to-orange-700',
    },
    {
      icon: Handshake,
      title: 'Gestão de fornecedores',
      description: 'Controle pagamentos, custos e relacionamento com fornecedores. Automatize cobranças e veja quanto deve e quanto já pagou.',
      gradient: 'from-blue-500 via-blue-600 to-blue-700',
    },
    {
      icon: Users,
      title: 'Multiusuário seguro',
      description: 'Adicione membros da equipe com diferentes níveis de acesso. Autenticação via Supabase para máxima segurança.',
      gradient: 'from-cyan-500 via-cyan-600 to-cyan-700',
    },
    {
      icon: Calculator,
      title: 'Calculadora de preços inteligente',
      description: 'Calcule o preço ideal de venda com base em taxas, custos e margens de lucro. O sistema sugere o valor ideal automaticamente.',
      gradient: 'from-emerald-500 via-emerald-600 to-emerald-700',
    },
    {
      icon: TrendingUp,
      title: 'Relatórios e indicadores',
      description: 'Tenha relatórios visuais de lucro líquido, faturamento por canal e desempenho de produtos.',
      gradient: 'from-rose-500 via-rose-600 to-rose-700',
    },
    {
      icon: Package,
      title: 'Controle de estoque automatizado',
      description: 'Sincronização automática de estoque entre Shopee, Mercado Livre e demais canais.',
      gradient: 'from-indigo-500 via-indigo-600 to-indigo-700',
    },
    {
      icon: DollarSign,
      title: 'Centro financeiro',
      description: 'Visualize entradas, saídas e lucros líquidos. Controle fluxo de caixa e custos fixos em um só painel.',
      gradient: 'from-amber-500 via-amber-600 to-amber-700',
    },
    {
      icon: Target,
      title: 'Planejamento e metas',
      description: 'Defina metas mensais e acompanhe o progresso com indicadores em tempo real.',
      gradient: 'from-violet-500 via-violet-600 to-violet-700',
    },
    {
      icon: MessageCircle,
      title: 'Relacionamento com clientes (CRM)',
      description: 'Organize contatos, histórico de compras e status de relacionamento.',
      gradient: 'from-lime-500 via-lime-600 to-lime-700',
    },
    {
      icon: Sparkles,
      title: 'IA e automações',
      description: 'Em breve: precificação automática, alertas de estoque e previsões de vendas baseadas em IA.',
      gradient: 'from-pink-500 via-pink-600 to-pink-700',
    },
  ];

  return (
    <section id="recursos" className="py-24 px-4 sm:px-6 lg:px-8 dark:bg-[#111115] light:bg-[#F9FAFB] relative overflow-hidden">
      {/* Grid texture background */}
      <div 
        className="absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }}
      ></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-title mb-6 leading-tight text-white">
            <span className="text-gradient">O Vendus pensa como um gestor</span> — e trabalha como sua equipe.
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Todas as ferramentas que você precisa para escalar suas vendas online — em um só lugar.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative"
              >
                <div className="relative h-full bg-[#1A1A24]/95 rounded-2xl p-8 border border-[#2C2C33] hover:border-[#FF6B00]/40 transition-all duration-300 hover:scale-[1.04] overflow-hidden glow-hover"
                  style={{
                    boxShadow: '0 0 25px -8px rgba(255, 107, 0, 0)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = '0 0 25px -8px rgba(255, 107, 0, 0.25)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = '0 0 25px -8px rgba(255, 107, 0, 0)';
                  }}
                >
                  {/* Icon container with neon gradient circle */}
                  <div className="relative mb-6 z-10">
                    <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-[#FF6B00]/20 to-[#7B2FF7]/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 border border-white/10">
                      <Icon size={28} className="text-[#FF6B00] icon-glow" />
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-3 transition-colors z-10 relative">
                    {feature.title}
                  </h3>
                  <p className="text-gray-300 leading-relaxed text-[15px] z-10 relative">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center"
        >
          <button
            onClick={() => {
              const element = document.getElementById('calculadora');
              if (element) element.scrollIntoView({ behavior: 'smooth' });
            }}
            className="group relative px-10 py-5 bg-gradient-to-r from-[#FF6B00] to-[#FF3C00] text-white rounded-xl font-semibold text-lg hover:brightness-125 hover:scale-[1.03] transition-all duration-300 overflow-hidden glow-button"
          >
            <span className="relative z-10">Veja como o Vendus simplifica sua operação</span>
            <div className="absolute inset-0 bg-gradient-to-r from-[#FF6B00] via-[#FF7A1A] to-[#FF6B00] bg-[length:200%_auto] animate-gradient opacity-0 group-hover:opacity-100 transition-opacity"></div>
          </button>
        </motion.div>
      </div>
    </section>
  );
}
