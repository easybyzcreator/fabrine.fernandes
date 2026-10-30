import { motion } from "motion/react";
import { Heart, Award, ShieldCheck, Users, HelpCircle, Star } from "lucide-react";

export default function Sobre() {
  const stats = [
    { label: "Anos de Prática Clínica", value: "5+" },
    { label: "Crianças & Famílias Apoiadas", value: "750+" },
    { label: "Avaliações com Sucesso", value: "99%" },
  ];

  return (
    <section id="sobre" className="py-24 bg-white relative overflow-hidden">
      {/* Decorative colored blobs in background */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-brand-blue/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-brand-rose/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Coluna de Imagem / Elementos Visuais */}
          <div className="lg:col-span-5 relative">
            <div className="relative z-10 max-w-sm mx-auto lg:max-w-none">
              
              {/* Moldura orgânica da foto */}
              <div className="aspect-[4/5] rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white focus-glow relative">
                <img
                  src="https://raw.githubusercontent.com/easybyzcreator/imagens/2c0cfe5d80a4fecbb9c924492e54ad1548290f58/fabrine.png"
                  alt="Dra. Fabrine Fernandes"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-700"
                />
                
                {/* Floating badge */}
                <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-md p-4 rounded-2xl shadow-lg border border-brand-gold/10">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-brand-gold/20 flex items-center justify-center text-brand-gold shrink-0">
                      <Award className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-serif text-sm sm:text-base font-semibold text-brand-gray">Fabrine Fernandes - Neuropsicopedagoga</h4>
                      <p className="text-[10px] sm:text-xs text-brand-gray/70 font-medium leading-tight mt-0.5">Registro Ativo na Associação Nacional de Psicopedagogia - ABPp 1242</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Decorative elements based on Brain/Heart Segments */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                className="absolute -top-6 -right-6 w-14 h-14 rounded-2xl bg-brand-blue/10 border border-brand-blue/20 flex items-center justify-center shadow-md animate-float-slow"
              >
                <Heart className="w-6 h-6 text-brand-blue" />
              </motion.div>

              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut" }}
                className="absolute -bottom-4 -left-6 w-12 h-12 rounded-2xl bg-brand-rose/10 border border-brand-rose/20 flex items-center justify-center shadow-md animate-float-fast"
              >
                <Star className="w-5 h-5 text-brand-rose" />
              </motion.div>
            </div>
          </div>

          {/* Coluna de Conteúdo Texto */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand-gold/10 text-brand-gold text-xs sm:text-sm font-semibold rounded-full mb-6 max-w-full text-left sm:text-center">
              <Award className="w-4 h-4 shrink-0 text-brand-gold" />
              <span className="leading-tight uppercase tracking-wider">Sobre Mim</span>
            </div>

            <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl font-medium tracking-tight text-brand-gray leading-tight mb-6">
              Uma trajetória dedicada ao <span className="text-brand-gold italic">desenvolvimento humano</span> e à aprendizagem
            </h2>

            {/* Biografia Sobre Mim */}
            <div className="space-y-6 text-brand-gray/80 font-sans leading-relaxed text-base sm:text-lg mb-8 text-justify">
              <p>
                Sou mãe coruja da Júlia e do Júlio, líder de projetos com crianças, apaixonada por música, Palestrante e Neuropsicopedagoga Clínica e Institucional com mais de 24 anos de experiência em educação. Minha atuação foca na área da aprendizagem, área em que sou dedicada, criteriosa e intensa, acredito que mais do que rótulos ou diagnósticos, minha missão é com pessoas, gosto de olhar para o que está por trás do diagnóstico.
              </p>
              <p>
                Possuo uma ampla formação nas áreas de Educação Inclusiva, Neuropsicopedagogia/Psicopedagogia, AEE - Atendimento Educacional Especializado, com certificações em TDAH, Dislexia, Alfabetização, capacitação em ABA (AT, ABA na prática, Manejo de comportamentos), Sistema de Avaliação/Rastreio Padronizado do TEA (Autismo) e em constante capacitação, pois acredito que devemos sempre buscar aprimoramento e atendimento de excelência em tudo que fazemos.
              </p>
            </div>

            {/* Destaques de Autoridade/Valores */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
              <div className="flex gap-4 p-4 rounded-2xl bg-brand-bg border border-brand-gold/10">
                <div className="w-10 h-10 rounded-full bg-brand-gold/10 flex items-center justify-center text-brand-gold shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-serif text-base font-semibold text-brand-gray">Ciência e Evidências</h4>
                  <p className="text-sm text-brand-gray/60">Intervenções baseadas em evidências trazidas pela neurociência.</p>
                </div>
              </div>

              <div className="flex gap-4 p-4 rounded-2xl bg-brand-bg border border-brand-gold/10">
                <div className="w-10 h-10 rounded-full bg-brand-blue/10 flex items-center justify-center text-brand-blue shrink-0">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-serif text-base font-semibold text-brand-gray font-medium">Olhar Multidisciplinar</h4>
                  <p className="text-sm text-brand-gray/60">Intermediação constante com a escola e terapeutas da criança.</p>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="flex flex-wrap gap-4 items-center">
              <a
                href="#atendimentos"
                className="px-6 py-3.5 bg-brand-gray text-white font-semibold text-sm rounded-full shadow-lg hover:bg-brand-gray/90 transition-all duration-300"
              >
                Conhecer Atendimentos
              </a>
              <a
                href="#contato"
                className="px-6 py-3.5 bg-brand-gold/10 hover:bg-brand-gold/20 text-brand-gold border border-brand-gold/20 font-semibold text-sm rounded-full transition-all duration-300"
              >
                Falar Diretamente Comigo
              </a>
            </div>

          </div>

        </div>

        {/* Linha de Estatísticas / Prova Social */}
        <div className="border-t border-brand-gold/15 mt-20 pt-16">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center flex flex-col">
                <span className="font-serif text-4xl sm:text-5xl font-bold text-brand-gold mb-1">
                  {stat.value}
                </span>
                <span className="text-xs sm:text-sm text-brand-gray/70 tracking-wide font-sans">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
