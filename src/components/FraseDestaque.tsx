import { motion } from "motion/react";
import { Quote } from "lucide-react";

export default function FraseDestaque() {
  return (
    <section className="py-16 sm:py-20 bg-[#FAF4EE] relative overflow-hidden flex items-center justify-center border-y border-brand-gold/15">
      {/* Subtle decorative background circles to follow Fabrine's style */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-72 h-72 bg-brand-rose/5 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-72 h-72 bg-brand-blue/5 rounded-full blur-2xl pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col items-center"
        >
          {/* Elegant gold Quote Icon */}
          <div className="w-12 h-12 rounded-full bg-brand-gold/10 flex items-center justify-center text-brand-gold mb-6">
            <Quote className="w-5 h-5 rotate-180" />
          </div>

          {/* First Line: Question (Display font, larger, premium italicized accent) */}
          <h3 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium text-brand-gray tracking-tight leading-tight mb-4">
            Para além do diagnóstico, <span className="text-brand-gold italic">quem é a criança</span> por trás do rótulo?
          </h3>

          {/* Golden decorative separator line */}
          <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-brand-gold/40 to-transparent my-4" />

          {/* Second Line: Subtext, explaining the mission */}
          <p className="font-sans text-base sm:text-lg md:text-xl text-brand-gray/80 leading-relaxed font-light max-w-2xl">
            Avaliação especializada e um plano de ação real para o aprendizado — <span className="font-semibold text-brand-gray">sem fórmula pronta</span>.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
