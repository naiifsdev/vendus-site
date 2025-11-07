import { Quote, Star } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Testimonials() {
  const testimonials = [
    {
      text: 'O Vendus virou meu painel de controle — Shopee, Mercado Livre e loja própria em tempo real.',
      author: 'Ana Paula',
      role: 'Empreendedora digital',
      rating: 5,
    },
    {
      text: 'Economizei horas de planilhas e entendi meus lucros pela primeira vez.',
      author: 'Rafael',
      role: 'Vendedor online',
      rating: 5,
    },
    {
      text: 'Minha equipe trabalha junta e organizada dentro do Vendus.',
      author: 'Camila',
      role: 'Gestora de marketplace',
      rating: 5,
    },
  ];

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 dark:bg-[#111115] light:bg-[#F9FAFB] relative overflow-hidden">
      {/* Grid texture background */}
      <div 
        className="absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }}
      ></div>
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full blur-3xl opacity-30"
          style={{ background: 'radial-gradient(circle, rgba(255, 107, 0, 0.15) 0%, rgba(123, 47, 247, 0.095) 50%, transparent 70%)' }}
        ></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-title text-white mb-4">
            Quem usa Vendus, aprova
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Veja o que nossos clientes têm a dizer sobre a transformação em suas vendas
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative bg-[#1A1A24]/95 rounded-2xl p-8 border border-[#2C2C33] hover:border-[#FF6B00]/40 transition-all duration-300 hover:scale-[1.02] glow-hover"
            >
              <div className="absolute top-6 right-6 opacity-5">
                <Quote size={64} className="text-white" />
              </div>

              <div className="flex items-center space-x-1 mb-4 relative z-10">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} size={18} className="fill-[#FBBF24] text-[#FBBF24]" />
                ))}
              </div>

              <p className="text-white text-base leading-relaxed mb-6 relative z-10 font-medium">
                "{testimonial.text}"
              </p>

              <div className="relative z-10">
                <div className="font-bold text-[#FF6B00]">{testimonial.author}</div>
                <div className="text-sm text-gray-300">{testimonial.role}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
