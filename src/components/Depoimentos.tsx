import React, { useState, useEffect } from "react";
import { Star, MessageSquare, Quote, Heart, CheckCircle2, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { trackClick } from "../lib/firebase";

export default function Depoimentos() {
  const handleWhatsAppClick = async () => {
    try {
      await trackClick("Agendamento via Depoimentos", "whatsapp");
    } catch (e) {
      console.error("Erro ao registrar trackClick:", e);
    }
    const text = "Olá Fabrine! Estava navegando no seu site e li os depoimentos de outras famílias e gostaria de conversar sobre a possibilidade de atendimento para meu filho(a).";
    const encodedText = encodeURIComponent(text);
    window.open(`https://wa.me/5519971242720?text=${encodedText}`, "_blank");
  };

  const googleReviews = [
    {
      id: "review-1",
      name: "Renata N. R.",
      initials: "RN",
      rating: 5,
      date: "17 de mar. de 2025",
      text: "Fabrine foi essencial para a evolução do aprendizado do meu filho. Os resultados foram excepcionais. Sempre serei grata a ela.",
      response: "Renata agradeço por toda a parceria que conseguimos fazer durante a intervenção psicopedagógica do nosso querido e daqui pra frente sei que ele vai voar! ❤️"
    },
    {
      id: "review-2",
      name: "Alessandra O.",
      initials: "AO",
      rating: 5,
      date: "18 de mar. de 2025",
      text: "Ótimo atendimento está ajudando muito minha filha, que vem se desenvolvendo cada dia melhor gratidão Fabrine!"
    },
    {
      id: "review-3",
      name: "Caroline M.",
      initials: "CM",
      rating: 5,
      date: "Há 6 semanas",
      text: "Fabrine uma ótima profissional! Minha filha se desenvolveu muito depois das aulas com ela. Uma grande diferença pra vida escolar da minha filha.",
      response: "Que bom poder contribuir com o desenvolvimento de sua filha, pode contar comigo 😊"
    },
    {
      id: "review-4",
      name: "Francielle M.",
      initials: "FM",
      rating: 5,
      date: "Há 6 semanas",
      text: "Fabrine, é uma excelente profissional, amorosa, carinhosa e atenciosa, foi muito importante no desenvolvimento da minha filha que tem autismo.",
    },
    {
      id: "review-5",
      name: "Luciana Z.",
      initials: "LZ",
      rating: 5,
      date: "Há 6 semanas",
      text: "Uma excelente profissional super atenciosa carinhosa"
    },
    {
      id: "review-6",
      name: "Eliane S.",
      initials: "ES",
      rating: 5,
      date: "Há 6 semanas",
      text: "Fabrine é uma ótima profissional, está acompanhando de perto meus 3 filhos, que estão evoluindo muito com as sessões de psicopedagogia."
    },
    {
      id: "review-7",
      name: "Lucilene D. T.",
      initials: "LD",
      rating: 5,
      date: "Há 6 semanas",
      text: "Fabrine acompanhou meu filho, é uma excelente profissional, atenciosa, respeitosa, empática e acima de tudo competente.",
      response: "Muito obrigada pelo carinho e confiança 😊"
    },
    {
      id: "review-8",
      name: "Matias D. P.",
      initials: "MP",
      rating: 5,
      date: "Há 6 semanas",
      text: "Excelente profissional mas além disso, um ser humano que entende o outro ser humano!..."
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(3);

  // Responsividade dinâmica de quantos itens mostrar em linha
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setVisibleCount(1);
      } else if (window.innerWidth < 1024) {
        setVisibleCount(2);
      } else {
        setVisibleCount(3);
      }
    };
    
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Autoplay para trocar na sequência a cada 5 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 5000);
    return () => clearInterval(interval);
  }, [currentIndex]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % googleReviews.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + googleReviews.length) % googleReviews.length);
  };

  const getVisibleReviews = () => {
    const visible = [];
    for (let i = 0; i < visibleCount; i++) {
      const index = (currentIndex + i) % googleReviews.length;
      visible.push(googleReviews[index]);
    }
    return visible;
  };

  return (
    <section id="depoimentos" className="py-20 bg-gradient-to-b from-[#FAF5F0] to-white relative overflow-hidden">
      {/* Decorative background blobs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-brand-rose/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-gold/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Cabeçalho */}
        <div className="text-center max-w-4xl mx-auto mb-12">
          <span className="inline-flex items-center gap-1.5 text-brand-rose text-xs font-bold uppercase tracking-[0.2em] font-sans mb-3">
            <Heart className="w-3.5 h-3.5 fill-brand-rose" /> AVALIAÇÕES E TESTEMUNHOS
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-brand-gray mb-4">
            O que dizem as <span className="text-brand-rose italic font-light">Famílias</span>
          </h2>
          <p className="font-sans text-brand-gray/70 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Relatos reais de pais, mães e educadores que vivenciaram a transformação escolar e emocional de suas crianças com o nosso apoio clínico e pedagógico.
          </p>
        </div>

        {/* Resumo da Avaliação do Google */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-xs mx-auto mb-12 bg-white rounded-xl p-4 border border-brand-gold/15 shadow-sm text-center flex flex-col items-center justify-center gap-2"
        >
          <div className="flex items-center gap-2">
            <span className="font-serif text-3xl font-bold text-brand-gray">5,0</span>
            <div className="flex text-brand-yellow">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-brand-yellow stroke-brand-yellow" />
              ))}
            </div>
          </div>
          <div className="flex items-center gap-1.5 text-[11px] font-sans text-brand-gray/60">
            <svg className="w-4.5 h-4.5 fill-current text-blue-500" viewBox="0 0 24 24">
              <path d="M12.24 10.285V13.4h6.887C18.2 15.614 15.645 18 12.24 18c-3.86 0-7-3.14-7-7s3.14-7 7-7c1.74 0 3.32.64 4.56 1.7l2.46-2.46C17.37 1.58 14.94 1 12.24 1 6.16 1 1.24 5.92 1.24 12s4.92 11 11 11c5.73 0 10.22-4.14 10.22-10.285 0-.7-.06-1.185-.18-1.715H12.24z" />
            </svg>
            <span>(16 avaliações no Google)</span>
          </div>
        </motion.div>

        {/* Carrossel de Depoimentos */}
        <div className="relative max-w-6xl mx-auto px-4 md:px-12 mb-10">
          
          {/* Botões de Navegação Lateral */}
          <button
            onClick={handlePrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white border border-brand-gold/15 flex items-center justify-center text-brand-gray hover:text-brand-rose hover:border-brand-rose/30 shadow-md hover:shadow-lg transition-all duration-300 transform active:scale-95 hidden md:flex"
            aria-label="Depoimento Anterior"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          
          <button
            onClick={handleNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white border border-brand-gold/15 flex items-center justify-center text-brand-gray hover:text-brand-rose hover:border-brand-rose/30 shadow-md hover:shadow-lg transition-all duration-300 transform active:scale-95 hidden md:flex"
            aria-label="Próximo Depoimento"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Área de exibição dos depoimentos ativos */}
          <div className="overflow-hidden py-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <AnimatePresence mode="popLayout">
                {getVisibleReviews().map((review) => {
                  return (
                    <motion.div
                      key={review.id}
                      layout
                      initial={{ opacity: 0, scale: 0.95, y: 15 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95, y: -15 }}
                      transition={{ duration: 0.4 }}
                      className="flex flex-col bg-white rounded-2xl p-6 border border-brand-gold/10 shadow-sm hover:shadow-md transition-all duration-300 relative justify-between min-h-[350px] group"
                    >
                      {/* Ícone de Aspas decorativo */}
                      <div className="absolute top-4 right-4 text-brand-rose/10 group-hover:text-brand-rose/25 transition-colors duration-300">
                        <Quote className="w-7 h-7 fill-current" />
                      </div>

                      <div>
                        {/* Estrelas do Review */}
                        <div className="flex text-brand-yellow mb-3">
                          {[...Array(review.rating)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 fill-brand-yellow stroke-brand-gold" />
                          ))}
                        </div>

                        {/* Texto do Depoimento */}
                        <p className="font-sans text-brand-gray/80 text-xs sm:text-sm leading-relaxed mb-4 italic">
                          "{review.text}"
                        </p>
                      </div>

                      {/* Linha Divisória para Resposta ou Autor */}
                      <div className="mt-auto">
                        {/* Resposta de Fabrine se houver */}
                        {review.response && (
                          <div className="mb-3 p-2.5 bg-brand-bg rounded-xl border border-brand-rose/10 text-[11px] text-brand-gray/70 leading-relaxed font-sans">
                            <div className="font-semibold text-brand-rose flex items-center gap-1 mb-0.5">
                              <CheckCircle2 className="w-3 h-3 fill-current" />
                              Resposta de Fabrine:
                            </div>
                            <p className="italic">"{review.response}"</p>
                          </div>
                        )}

                        {/* Detalhes do Autor */}
                        <div className="flex items-center gap-2.5 border-t border-brand-gold/10 pt-3">
                          <div className="w-8 h-8 rounded-full bg-brand-rose/10 border border-brand-rose/20 flex items-center justify-center text-brand-rose text-xs font-bold font-sans shrink-0">
                            {review.initials}
                          </div>
                          <div className="min-w-0">
                            <h4 className="font-serif text-xs font-semibold text-brand-gray truncate">
                              {review.name}
                            </h4>
                            <div className="flex items-center gap-1 text-[9px] text-brand-gray/50 font-sans">
                              <span className="text-blue-500 font-medium">Google Review</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          </div>

          {/* Botões de Navegação Mobile (embaixo dos cards) */}
          <div className="flex items-center justify-center gap-4 mt-4 md:hidden">
            <button
              onClick={handlePrev}
              className="w-9 h-9 rounded-full bg-white border border-brand-gold/15 flex items-center justify-center text-brand-gray hover:text-brand-rose shadow-sm"
              aria-label="Depoimento Anterior"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            
            <button
              onClick={handleNext}
              className="w-9 h-9 rounded-full bg-white border border-brand-gold/15 flex items-center justify-center text-brand-gray hover:text-brand-rose shadow-sm"
              aria-label="Próximo Depoimento"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Dots Indicadores de Paginação */}
          <div className="flex justify-center gap-1.5 mt-6">
            {googleReviews.map((_, index) => {
              // Deixar ativo o dot que corresponde à primeira review visível
              const isActive = index === currentIndex;
              return (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`h-2.5 rounded-full transition-all duration-300 ${
                    isActive ? "w-6 bg-brand-rose" : "w-2.5 bg-brand-rose/20 hover:bg-brand-rose/45"
                  }`}
                  aria-label={`Ir para slide ${index + 1}`}
                />
              );
            })}
          </div>

        </div>

        {/* CTA final abaixo dos depoimentos */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mt-12"
        >
          <button
            onClick={handleWhatsAppClick}
            className="inline-flex items-center justify-center gap-2 py-3 px-6 bg-brand-rose hover:bg-brand-rose/90 text-white font-bold text-xs uppercase tracking-wider rounded-full shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5"
          >
            <MessageSquare className="w-4.5 h-4.5 fill-current" />
            Quero agendar uma conversa
          </button>
        </motion.div>

      </div>
    </section>
  );
}
