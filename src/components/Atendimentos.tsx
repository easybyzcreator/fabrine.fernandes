import { useState } from "react";
import { ATENDIMENTOS, Atendimento } from "../types";
import { motion, AnimatePresence } from "motion/react";
import { Check, Sparkles, HelpCircle, GraduationCap, Video, MapPin, ArrowUpRight } from "lucide-react";
import { trackClick } from "../lib/firebase";

export default function Atendimentos() {
  const [selectedAtendimento, setSelectedAtendimento] = useState<Atendimento>(ATENDIMENTOS[0]);
  const [filterMode, setFilterMode] = useState<'all' | 'online' | 'presencial'>('all');

  const filteredAtendimentos = ATENDIMENTOS.filter(item => {
    if (filterMode === 'online') return item.online;
    if (filterMode === 'presencial') return item.presencial;
    return true;
  });

  // Mapeamento de cores para classes Tailwind v4
  const colorMap: Record<string, { bg: string, text: string, border: string, indicator: string, glow: string }> = {
    yellow: {
      bg: "bg-brand-yellow/10",
      text: "text-brand-gold",
      border: "border-brand-yellow/20",
      indicator: "bg-brand-yellow",
      glow: "shadow-brand-yellow/10"
    },
    blue: {
      bg: "bg-brand-blue/10",
      text: "text-brand-blue",
      border: "border-brand-blue/20",
      indicator: "bg-brand-blue",
      glow: "shadow-brand-blue/10"
    },
    rose: {
      bg: "bg-brand-rose/10",
      text: "text-brand-rose",
      border: "border-brand-rose/20",
      indicator: "bg-brand-rose",
      glow: "shadow-brand-rose/10"
    },
    green: {
      bg: "bg-brand-green/10",
      text: "text-brand-green",
      border: "border-brand-green/20",
      indicator: "bg-brand-green",
      glow: "shadow-brand-green/10"
    }
  };

  return (
    <section id="atendimentos" className="py-24 bg-brand-bg relative overflow-hidden">
      <div className="absolute top-0 right-1/4 w-80 h-80 bg-brand-yellow/5 rounded-full blur-3xl pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Cabeçalho */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-blue/10 text-brand-blue text-xs font-semibold uppercase tracking-widest rounded-full mb-4">
            <GraduationCap className="w-3.5 h-3.5" />
            Atendimento Especializado
          </div>
          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl font-medium tracking-tight text-brand-gray mb-4">
            Abordagem clínica focada na <span className="italic text-brand-gold font-light">neurodiversidade</span>
          </h2>
          <p className="font-sans text-brand-gray/70 text-lg">
            Diagnóstico e intervenção de barreiras de aprendizagem através de acolhimento, escuta ativa, ciência e estimulação cognitiva.
          </p>
        </div>

        {/* Layout Interativo */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Lado Esquerdo - Lista de Atendimentos */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            {filteredAtendimentos.map((atendimento) => {
              const active = selectedAtendimento.id === atendimento.id;
              const colorInfo = colorMap[atendimento.cor];

              return (
                <motion.button
                  key={atendimento.id}
                  onClick={() => setSelectedAtendimento(atendimento)}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  className={`flex items-start text-left p-5 rounded-2xl border transition-all duration-300 ${
                    active
                      ? `bg-white border-brand-gold/30 shadow-xl focus-glow`
                      : "bg-white/50 hover:bg-white border-transparent hover:shadow-md"
                  }`}
                >
                  {/* Círculo indicador com cor correspondente */}
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 mr-4 ${colorInfo.bg}`}>
                    <div className={`w-3 h-3 rounded-full ${colorInfo.indicator} animate-pulse`} />
                  </div>

                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-1">
                      <h3 className="font-serif text-lg sm:text-xl font-bold text-brand-gray">
                        {atendimento.titulo}
                      </h3>
                      <ArrowUpRight className={`w-4 h-4 transition-transform duration-300 ${
                        active ? "rotate-45 text-brand-gold" : "text-brand-gray/30"
                      }`} />
                    </div>
                    <p className="font-sans text-xs sm:text-sm text-brand-gray/60 line-clamp-2 leading-relaxed">
                      {atendimento.descricao}
                    </p>
                    
                    {/* Tags indicadoras */}
                    <div className="flex gap-2 mt-3">
                      {atendimento.online && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-brand-blue/5 text-[10px] font-bold uppercase tracking-wider text-brand-blue rounded-full">
                          <Video className="w-2.5 h-2.5" /> Online
                        </span>
                      )}
                      {atendimento.presencial && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-brand-green/5 text-[10px] font-bold uppercase tracking-wider text-brand-green rounded-full">
                          <MapPin className="w-2.5 h-2.5" /> Presencial
                        </span>
                      )}
                    </div>
                  </div>
                </motion.button>
              );
            })}
          </div>

          {/* Lado Direito - Detalhes do Atendimento Ativo */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 md:p-10 border border-brand-gold/10 shadow-2xl relative overflow-hidden min-h-[450px]">
            {/* Background elements */}
            <div className={`absolute -top-20 -right-20 w-48 h-48 rounded-full blur-3xl opacity-50 ${colorMap[selectedAtendimento.cor].bg}`} />

            <AnimatePresence mode="wait">
              <motion.div
                key={selectedAtendimento.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="relative z-10 flex flex-col justify-between h-full"
              >
                <div>
                  {/* Badge da Especialidade */}
                  <div className="inline-flex items-center gap-1.5 mb-6">
                    <span className={`w-2.5 h-2.5 rounded-full ${colorMap[selectedAtendimento.cor].indicator}`} />
                    <span className="text-xs font-bold tracking-widest uppercase text-brand-gray/60 font-sans">
                      Área de Atuação · {selectedAtendimento.titulo.split(" ").pop()}
                    </span>
                  </div>

                  <h3 className="font-serif text-3xl sm:text-4xl font-semibold text-brand-gray mb-4 leading-tight">
                    {selectedAtendimento.titulo}
                  </h3>

                  <p className="font-sans text-brand-gray/80 text-base sm:text-lg leading-relaxed mb-6">
                    {selectedAtendimento.descricao}
                  </p>

                  {/* Detalhes Técnicos e Metodologia */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8 border-t border-brand-gold/10 pt-6">
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-widest text-brand-gold mb-2 font-sans">Público-Alvo</h4>
                      <p className="text-sm text-brand-gray/80 font-sans">{selectedAtendimento.publico}</p>
                    </div>
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-widest text-brand-gold mb-2 font-sans">Nossa Metodologia</h4>
                      <p className="text-sm text-brand-gray/80 font-sans">{selectedAtendimento.metodologia}</p>
                    </div>
                  </div>

                  {/* Linha com itens detalhados de intervenção */}
                  <div className="space-y-3.5 mb-8">
                    <h4 className="text-xs font-bold uppercase tracking-widest text-brand-gray/60 mb-3 font-sans">
                      O que está incluído no processo de intervenção:
                    </h4>
                    {selectedAtendimento.detalhes.map((detalhe, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${colorMap[selectedAtendimento.cor].bg}`}>
                          <Check className={`w-3 h-3 ${colorMap[selectedAtendimento.cor].text}`} />
                        </div>
                        <span className="text-sm text-brand-gray/80 font-sans leading-relaxed">
                          {detalhe}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Botões de Ação Rápidos */}
                <div className="flex flex-wrap gap-4 border-t border-brand-gold/10 pt-6">
                  <a
                    href={`https://wa.me/5519971242720?text=Olá%20Fabrine!%20Eu%20estava%20no%20seu%20site%20e%20gostaria%20de%20saber%20mais%20detalhes%20sobre%20o%20atendimento%20para%20${encodeURIComponent(selectedAtendimento.titulo)}.`}
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => trackClick(`Atendimento: ${selectedAtendimento.titulo}`, "whatsapp")}
                    className="w-full text-center py-3.5 bg-gradient-to-r from-brand-gold to-brand-yellow text-brand-gray font-semibold text-sm rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
                  >
                    Quero Agendar Avaliação
                  </a>
                </div>

              </motion.div>
            </AnimatePresence>
          </div>

        </div>

      </div>
    </section>
  );
}
