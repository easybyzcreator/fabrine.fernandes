import { motion } from "motion/react";
import { Heart } from "lucide-react";

export default function CartaAcolhedora() {
  return (
    <section id="carta-pais" className="py-24 bg-white relative overflow-hidden">
      {/* Soft elegant background glows */}
      <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-brand-rose/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-brand-blue/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
        {/* Dynamic Badge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4 py-2 bg-brand-rose/10 text-brand-rose text-xs sm:text-sm font-semibold rounded-full mb-8 max-w-full"
        >
          <Heart className="w-4 h-4 shrink-0 text-brand-rose" />
          <span className="leading-tight text-center">O que um comportamento desafiador está tentando dizer sobre a aprendizagem da criança</span>
        </motion.div>

        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="font-serif text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-brand-gray leading-tight mb-10 max-w-3xl mx-auto"
        >
          "Eu te ajudo a entender o que seu filho <span className="text-brand-gold italic">tenta te dizer</span>"
        </motion.h2>

        {/* Outer Card with subtle premium border */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="bg-brand-bg rounded-[2.5rem] border border-brand-gold/15 p-8 sm:p-12 md:p-16 shadow-xl text-left relative focus-glow"
        >
          {/* Internal floating decor element */}
          <div className="absolute top-4 right-6 text-brand-gold/20 font-serif text-8xl pointer-events-none select-none">
            ”
          </div>

          <div className="space-y-6 text-brand-gray/80 font-sans leading-relaxed text-base sm:text-lg">
            <p className="font-semibold text-brand-gray text-lg">
              Querida mãe, querido pai,
            </p>
            <p>
              Eu sei como dói ver seu filho enfrentar barreiras que parecem intransponíveis. Sei da dor de ouvir reclamações na escola, do peso do cansaço após uma tarde inteira tentando fazer com que ele foque no dever, e do medo do futuro que assombra as suas noites.
            </p>
            <p>
              Quero que você respire fundo e tire esse peso dos ombros: <span className="font-semibold text-brand-gray">você não está falhando e seu filho não faz isso para te desafiar ou por pura pirraça</span>. O cérebro atípico (seja com TDAH, Autismo ou Dislexia) tem um funcionamento diferente. É como se o mundo falhasse em traduzir as instruções para ele.
            </p>
            <p>
              Como Neuropsicopedagoga, minha missão não é rotular ou classificar seu filho, mas ser a tradutora dele. Te ajudo a enxergar através dos olhos dele, estruturando a rotina, percebendo potencialidades e dificuldades no desenvolvimento cognitivo e trazendo as estratégias certas para que ele se desenvolva com autonomia e alegria.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
