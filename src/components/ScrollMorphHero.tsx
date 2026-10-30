import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { ArrowDown, HelpCircle, Heart, Sparkles, CheckCircle } from "lucide-react";

export default function ScrollMorphHero() {
  const containerRef = useRef<HTMLDivElement>(null);

  // useScroll captura o progresso de rolagem dentro do container do Hero
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Transformações controladas pelo scroll (Scroll-Morph)
  const heroScale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.98, 0.95]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.9, 1], [1, 1, 0]);
  const titleY = useTransform(scrollYProgress, [0, 0.35], [0, -80]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.25], [1, 0]);
  
  // Imagem da Fabrine: escala e opacidade
  const imgScale = useTransform(scrollYProgress, [0, 0.4, 1], [1, 1.15, 1.2]);
  const imgY = useTransform(scrollYProgress, [0, 0.4], [0, 50]);

  // Transformação das partes do logo do cérebro (se unindo de forma lúdica)
  // Parte 1: Superior Esquerdo (Azul Claro - Foco) - Vem da esquerda
  const p1X = useTransform(scrollYProgress, [0, 0.45], [-280, -32]);
  const p1Y = useTransform(scrollYProgress, [0, 0.45], [-150, -38]);
  const p1Rotate = useTransform(scrollYProgress, [0, 0.45], [-45, 0]);
  const p1Scale = useTransform(scrollYProgress, [0, 0.45], [1.4, 1.1]);

  // Parte 2: Superior Direito (Verde - Aprendizado) - Vem da direita
  const p2X = useTransform(scrollYProgress, [0, 0.45], [280, 24]);
  const p2Y = useTransform(scrollYProgress, [0, 0.45], [-130, -35]);
  const p2Rotate = useTransform(scrollYProgress, [0, 0.45], [45, 0]);
  const p2Scale = useTransform(scrollYProgress, [0, 0.45], [1.3, 1.1]);

  // Parte 3: Inferior Esquerdo (Rosa/Coral - Afeto) - Vem de baixo-esquerda
  const p3X = useTransform(scrollYProgress, [0, 0.45], [-220, -30]);
  const p3Y = useTransform(scrollYProgress, [0, 0.45], [240, 20]);
  const p3Rotate = useTransform(scrollYProgress, [0, 0.45], [-30, 0]);
  const p3Scale = useTransform(scrollYProgress, [0, 0.45], [1.5, 1.1]);

  // Parte 4: Inferior Direito (Amarelo - Conexão) - Vem de baixo-direita
  const p4X = useTransform(scrollYProgress, [0, 0.45], [220, 22]);
  const p4Y = useTransform(scrollYProgress, [0, 0.45], [260, 22]);
  const p4Rotate = useTransform(scrollYProgress, [0, 0.45], [60, 0]);
  const p4Scale = useTransform(scrollYProgress, [0, 0.45], [1.4, 1.1]);

  // Revelação do logo central unificado (cérebro montado) no final do scroll
  const logoUnificadoOpacity = useTransform(scrollYProgress, [0.35, 0.5, 1], [0, 1, 1]);
  const logoUnificadoScale = useTransform(scrollYProgress, [0.35, 0.5], [0.8, 1.15]);
  const textAcolhedorOpacity = useTransform(scrollYProgress, [0.4, 0.55, 0.9, 1], [0, 1, 1, 0]);
  const textAcolhedorY = useTransform(scrollYProgress, [0.4, 0.55], [40, 0]);

  return (
    <div
      ref={containerRef}
      className="relative w-full bg-brand-bg"
      style={{ height: "280vh" }} // Dá o espaço ideal de scroll para o efeito e leitura do card
    >
      {/* Sticky container fixado no topo de 100vh */}
      <div className="sticky top-0 h-screen w-full flex flex-col justify-center items-center overflow-hidden px-4">
        
        {/* Elemento de fundo texturizado sutil */}
        <div className="absolute inset-0 bg-[radial-gradient(#eadcd0_1px,transparent_1px)] [background-size:16px_16px] opacity-30 pointer-events-none" />
        
        <motion.div
          style={{ scale: heroScale, opacity: heroOpacity }}
          className="relative w-full max-w-6xl flex flex-col items-center justify-center text-center z-20"
        >
          {/* TÍTULO PRINCIPAL (Esconde conforme rola) */}
          <motion.div
            style={{ y: titleY, opacity: titleOpacity }}
            className="flex flex-col items-center justify-center mb-8"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-gold/10 text-brand-gold text-xs font-semibold uppercase tracking-widest rounded-full mb-4">
              <Sparkles className="w-3 h-3" />
              Neuropsicopedagogia Clínica
            </div>
            <h1 className="font-serif text-5xl sm:text-7xl md:text-8xl font-medium tracking-tight text-brand-gray leading-none mb-3">
              Seu filho te <span className="italic font-light text-brand-gold">desafia?</span>
            </h1>
            <p className="font-sans text-lg sm:text-xl md:text-2xl font-light text-brand-gray/80 tracking-wide max-w-2xl">
              Eu te ajudo a <strong className="font-medium text-brand-rose">entendê-lo</strong> — desmistificando o TDAH, Dislexia e Autismo com afeto e ciência.
            </p>
          </motion.div>

          {/* PALCO CENTRAL: FOTO DA FABRINE E AS PARTES DO CÉREBRO EM SCROLL-MORPH */}
          <div className="relative w-72 h-72 sm:w-80 sm:h-80 md:w-96 md:h-96 flex items-center justify-center">
            
            {/* Círculo de fundo dourado brilhante sutil */}
            <div className="absolute inset-4 rounded-full bg-gradient-to-tr from-brand-gold/5 via-brand-yellow/10 to-brand-blue/5 blur-xl pointer-events-none" />

            {/* FOTO DA FABRINE */}
            <motion.div
              style={{ scale: imgScale, y: imgY }}
              className="relative w-60 h-60 sm:w-64 sm:h-64 md:w-72 md:h-72 rounded-full overflow-hidden border-4 border-white shadow-2xl z-10 focus-glow"
            >
              <img
                src="https://raw.githubusercontent.com/easybyzcreator/imagens/2c0cfe5d80a4fecbb9c924492e54ad1548290f58/fabrine.png"
                alt="Fabrine Fernandes Neuropsicopedagoga"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-gold/20 via-transparent to-transparent" />
            </motion.div>

            {/* ================= ELEMENTOS SCROLL-MORPH (As partes do Cérebro/Logo) ================= */}
            
            {/* Parte 1: Superior Esquerdo - Azul Claro (Foco / Funções Executivas) */}
            <motion.div
              style={{ x: p1X, y: p1Y, rotate: p1Rotate, scale: p1Scale }}
              className="absolute z-20 cursor-pointer pointer-events-auto"
            >
              <div className="relative p-3 bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-brand-blue/20 flex flex-col items-center gap-1 hover:scale-105 transition-transform duration-300">
                <svg className="w-12 h-12 text-brand-blue drop-shadow" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20C10.15,20 8.44,19.34 7.11,18.23L12,12V4Z" />
                </svg>
                <span className="text-[10px] font-bold text-brand-blue uppercase tracking-wider font-sans">Foco</span>
              </div>
            </motion.div>

            {/* Parte 2: Superior Direito - Verde (Aprendizado / Cognição) */}
            <motion.div
              style={{ x: p2X, y: p2Y, rotate: p2Rotate, scale: p2Scale }}
              className="absolute z-20 cursor-pointer pointer-events-auto"
            >
              <div className="relative p-3 bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-brand-green/20 flex flex-col items-center gap-1 hover:scale-105 transition-transform duration-300">
                <svg className="w-12 h-12 text-brand-green drop-shadow" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12,2C6.48,2 2,6.48 2,12C2,17.52 6.48,22 12,22C17.52,22 22,17.52 22,12C22,6.48 17.52,2 12,2M12,4C14.21,4 16,5.79 16,8C16,10.21 14.21,12 12,12C9.79,12 8,10.21 8,8C8,5.79 9.79,4 12,4Z" />
                </svg>
                <span className="text-[10px] font-bold text-brand-green uppercase tracking-wider font-sans">Cognição</span>
              </div>
            </motion.div>

            {/* Parte 3: Inferior Esquerdo - Rosa/Coral (Afeto / Linguagem) */}
            <motion.div
              style={{ x: p3X, y: p3Y, rotate: p3Rotate, scale: p3Scale }}
              className="absolute z-20 cursor-pointer pointer-events-auto"
            >
              <div className="relative p-3 bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-brand-rose/20 flex flex-col items-center gap-1 hover:scale-105 transition-transform duration-300">
                <svg className="w-12 h-12 text-brand-rose drop-shadow" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12,21.35L10.55,20.03C5.4,15.36 2,12.27 2,8.5C2,5.41 4.42,3 7.5,3C9.24,3 10.91,3.81 12,5.08C13.09,3.81 14.76,3 16.5,3C19.58,3 22,5.41 22,8.5C22,12.27 18.6,15.36 13.45,20.03L12,21.35Z" />
                </svg>
                <span className="text-[10px] font-bold text-brand-rose uppercase tracking-wider font-sans">Afeto</span>
              </div>
            </motion.div>

            {/* Parte 4: Inferior Direito - Amarelo/Dourado (Integração / Rotina) */}
            <motion.div
              style={{ x: p4X, y: p4Y, rotate: p4Rotate, scale: p4Scale }}
              className="absolute z-20 cursor-pointer pointer-events-auto"
            >
              <div className="relative p-3 bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-brand-gold/20 flex flex-col items-center gap-1 hover:scale-105 transition-transform duration-300">
                <svg className="w-12 h-12 text-brand-gold drop-shadow" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19,19H5V8H19M19,3H18V1H16V3H8V1H6V3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5A2,2 0 0,0 19,3Z" />
                </svg>
                <span className="text-[10px] font-bold text-brand-gold uppercase tracking-wider font-sans">Rotina</span>
              </div>
            </motion.div>

            {/* ================= LOGO UNIFICADO MONTADO (Aparece no centro no fim do scroll) ================= */}
            <motion.div
              style={{ opacity: logoUnificadoOpacity, scale: logoUnificadoScale }}
              className="absolute z-30 pointer-events-none flex flex-col items-center justify-center bg-brand-bg border-2 border-brand-gold/20 p-6 rounded-full shadow-2xl w-52 h-52 sm:w-56 sm:h-56"
            >
              {/* O Logo dela: Cérebro multicolorido */}
              <div className="relative w-24 h-24 mb-2">
                <img
                  src="https://raw.githubusercontent.com/easybyzcreator/imagens/17563760155e9adfc5a58f5f85a53a7de6c2d3c8/ffbb.png"
                  alt="Logo da Fabrine Fernandes"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-contain animate-pulse"
                />
              </div>
              <span className="font-serif text-sm font-semibold text-brand-gray tracking-wide">
                Integração Cognitiva
              </span>
              <span className="text-[9px] tracking-wider text-brand-gold uppercase font-bold">
                Método Fabrine
              </span>
            </motion.div>
          </div>

          {/* TEXTO DE REVELAÇÃO DO SCROLL (Surge acolhedor) */}
          <motion.div
            style={{ opacity: textAcolhedorOpacity, y: textAcolhedorY }}
            className="absolute bottom-2 md:bottom-10 max-w-xl bg-white/70 backdrop-blur-md border border-brand-gold/15 p-6 rounded-2xl shadow-xl mt-6 z-30"
          >
            <h3 className="font-serif text-2xl font-semibold text-brand-gray mb-2">
              Entendimento traz calmaria.
            </h3>
            <p className="font-sans text-sm text-brand-gray/85 leading-relaxed">
              O cérebro de uma criança com TDAH, Dislexia ou Autismo processa o mundo de outra forma. 
              <strong> Não é birra, é barreira.</strong> Meu trabalho é conectar a ciência à rotina da sua casa para acolher seu filho e guiar sua família.
            </p>
            <div className="flex justify-center mt-3 text-xs font-semibold text-brand-gray">
              <span className="inline-flex items-center gap-1">
                <CheckCircle className="w-3.5 h-3.5 text-brand-green shrink-0" /> Presencial Americana, SP
              </span>
            </div>
          </motion.div>
        </motion.div>

        {/* INDICADOR DE SCROLL ANIMAÇÃO */}
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          style={{ opacity: useTransform(scrollYProgress, [0, 0.25], [1, 0]) }}
          className="absolute bottom-6 flex flex-col items-center gap-1 cursor-pointer"
          onClick={() => {
            window.scrollTo({ top: window.innerHeight * 0.75, behavior: "smooth" });
          }}
        >
          <span className="text-[10px] tracking-[0.25em] uppercase text-brand-gray/60 font-medium">
            Role para transformar
          </span>
          <ArrowDown className="w-4 h-4 text-brand-gold" />
        </motion.div>

      </div>
    </div>
  );
}
