import { useState } from "react";
import { Check, BookOpen, Clock, Calendar, ArrowRight, Sparkles, AlertCircle, ChevronDown, ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface Capacitacao {
  id: string;
  titulo: string;
  subtitulo: string;
  descricao: string;
  cor: "blue" | "rose" | "green";
  duracao: string;
  inclusoTitulo: string;
  inclusoList: string[];
  cronogramaTitulo: string;
  cronogramaList: string[];
  preco: string;
  precoSub?: string;
  link: string;
  ctaText: string;
}

const CAPACITACOES: Capacitacao[] = [
  {
    id: "tea-sala-aula",
    titulo: "TEA na Sala de Aula",
    subtitulo: "Tenho um aluno com características de TEA. E agora?",
    descricao: "Esta capacitação foi desenvolvida para professores e profissionais da educação que desejam ampliar seus conhecimentos sobre o Transtorno do Espectro Autista (TEA) e compreender como esse estudante pode se apresentar no contexto escolar. Trata-se de uma formação introdutória, baseada em evidências e voltada à realidade da sala de aula, oferecendo fundamentos para uma atuação pedagógica mais consciente e inclusiva.",
    cor: "blue",
    duracao: "8 Aulas Gravadas • Acesso por 12 meses",
    inclusoTitulo: "O que está incluso",
    inclusoList: [
      "8 aulas gravadas;",
      "acesso às aulas por 12 meses;",
      "materiais de apoio;",
      "certificado de participação para quem concluir 90% do curso;",
      "canal de suporte pelo WhatsApp durante 30 dias para esclarecimento de dúvidas relacionadas ao conteúdo do curso."
    ],
    cronogramaTitulo: "Cronograma de Acompanhamento:",
    cronogramaList: [
      "Aula 1: Introdução à Educação Inclusiva",
      "Aula 2: Legislação e direitos do estudante com TEA",
      "Aula 3: Características frequentemente observadas em estudantes com TEA e sinais que merecem atenção da equipe escolar.",
      "Aula 4: Estratégias iniciais para favorecer a participação do estudante com TEA",
      "Aula 5: Comportamentos desafiadores: o que precisamos compreender?",
      "Aula 6: O papel do Atendimento Educacional Especializado (AEE)",
      "Aula 7: PAEE e PEI: diferenças, objetivos e responsabilidades",
      "Aula 8: Estudo de caso: princípios para elaboração do PEI"
    ],
    preco: "Sob consulta",
    link: "https://wa.me/5519971242720?text=Olá%20Fabrine!%20Gostaria%20de%20solicitar%20informações%20sobre%20o%20curso%20TEA%20na%20Sala%20de%20Aula.",
    ctaText: "Entrar em Contato"
  },
  {
    id: "professora-inclusiva",
    titulo: "Curso: Professora Inclusiva: Primeiros Passos",
    subtitulo: "Segurança e conhecimento prático para iniciar na Educação Inclusiva.",
    descricao: "Dar os primeiros passos na Educação Inclusiva exige conhecimento e segurança. Neste curso, você conhecerá os principais conceitos da Educação Inclusiva, aspectos da legislação, características gerais de algumas deficiências e transtornos frequentemente encontrados no contexto escolar e estratégias iniciais para organizar práticas pedagógicas mais inclusivas. O foco será estudar TEA e Deficiência Intelectual como exemplos para compreender princípios aplicáveis a diferentes necessidades educacionais. Trata-se de uma capacitação dinâmica e interativa com encontros e materiais inclusos.",
    cor: "rose",
    duracao: "Aulas Gravadas + Encontros Ao Vivo",
    inclusoTitulo: "Você não ficará sozinha após assistir às aulas. Esta capacitação inclui:",
    inclusoList: [
      "Encontros ao vivo;",
      "Acesso às gravações e materiais de apoio;",
      "Modelos de documentos e certificado de curso livre para quem completar 90% do curso;",
      "Dois encontros ao vivo para discussão de casos reais;",
      "Espaço para perguntas e troca de experiências;",
      "Acompanhamento pelo WhatsApp para esclarecimento de dúvidas sobre os conteúdos do curso e discussão de situações vivenciadas na prática escolar."
    ],
    cronogramaTitulo: "Cronograma de Acompanhamento:",
    cronogramaList: [
      "Aula 1: Fundamentos da Educação Inclusiva",
      "Aula 2: Legislação e direitos educacionais",
      "Aula 3: Compreendendo o estudante com TEA",
      "Aula 4: Deficiência Intelectual: características e necessidades de apoio",
      "Aula 5 (AO VIVO) - Comportamentos desafiadores: o que eles comunicam?",
      "Aula 6: Estratégias simples que qualquer professor pode aplicar amanhã.",
      "Aula 7 (AO VIVO): Construção coletiva de um estudo de caso",
      "Aula 8: PEI e PAEE: Entendendo as diferenças e quando cada documento é utilizado."
    ],
    preco: "Sob consulta",
    link: "https://wa.me/5519971242720?text=Olá%20Fabrine!%20Gostaria%20de%20solicitar%20informações%20sobre%20o%20curso%20Professora%20Inclusiva:%20Primeiros%20Passos.",
    ctaText: "Entrar em Contato"
  },
  {
    id: "palestra-comportamentos",
    titulo: "Palestra | Online ou Presencial",
    subtitulo: "Além da disciplina: entendendo os comportamentos desafiadores na sala de aula",
    descricao: "Os comportamentos desafiadores são uma das principais preocupações dos profissionais da educação e, muitas vezes, são interpretados apenas como problemas de disciplina. Nesta palestra, propomos um olhar mais amplo sobre o tema, considerando os fatores que podem influenciar esses comportamentos, especialmente no contexto da Educação Inclusiva e do Transtorno do Espectro Autista (TEA). Uma palestra voltada a professores, gestores, equipes pedagógicas e demais profissionais da educação que desejam ampliar seus conhecimentos sobre o tema e refletir sobre possibilidades de atuação no cotidiano escolar.",
    cor: "green",
    duracao: "Formato Online (ao vivo – 1h30) ou Presencial (a combinar)",
    inclusoTitulo: "Abordagem do encontro",
    inclusoList: [
      "Discussão de conceitos fundamentais e estratégias baseadas em evidências;",
      "Compreensão profunda da função do comportamento;",
      "Prevenção de situações de maior tensão e agitação;",
      "Construção de práticas pedagógicas que favorecem a participação dos estudantes e uma convivência mais positiva em sala de aula."
    ],
    cronogramaTitulo: "Ideal para:",
    cronogramaList: [
      "Professores de Educação Infantil, Ensino Fundamental e Médio",
      "Gestores e Coordenadores Pedagógicos",
      "Profissionais de Atendimento Educacional Especializado (AEE)",
      "Equipes multidisciplinares e de apoio escolar"
    ],
    preco: "Sob consulta",
    link: "https://wa.me/5519971242720?text=Olá%20Fabrine!%20Gostaria%20de%20solicitar%20informações%20e%20orçamento%20para%20a%20Palestra%20Além%20da%20Disciplina.",
    ctaText: "Entrar em Contato"
  }
];

export default function MentoriasCursos() {
  const [expandedCards, setExpandedCards] = useState<Record<string, boolean>>({});

  const toggleExpand = (id: string) => {
    setExpandedCards((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const colorMap = {
    blue: {
      bg: "bg-brand-blue/10",
      text: "text-brand-blue",
      border: "border-brand-blue/20",
      pill: "bg-brand-blue",
      hoverGlow: "group-hover:shadow-brand-blue/10"
    },
    rose: {
      bg: "bg-brand-rose/10",
      text: "text-brand-rose",
      border: "border-brand-rose/20",
      pill: "bg-brand-rose",
      hoverGlow: "group-hover:shadow-brand-rose/10"
    },
    green: {
      bg: "bg-brand-green/10",
      text: "text-brand-green",
      border: "border-brand-green/20",
      pill: "bg-brand-green",
      hoverGlow: "group-hover:shadow-brand-green/10"
    }
  };

  return (
    <section id="mentorias-cursos" className="py-24 bg-[#E8F6FA] relative overflow-hidden">
      {/* Decorative background blobs */}
      <div className="absolute top-1/4 left-10 w-72 h-72 bg-brand-blue/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-10 w-72 h-72 bg-brand-blue/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Cabeçalho */}
        <div className="text-center max-w-4xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-blue/20 text-brand-gray font-sans text-xs font-semibold uppercase tracking-widest rounded-full mb-4">
            <BookOpen className="w-3.5 h-3.5 text-brand-blue" />
            CURSOS, PALESTRAS E CAPACITAÇÃO PARA PROFESSORES
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-brand-gray mb-6 leading-tight">
            CAPACITAÇÃO PARA GUIAR QUEM GUIA A CRIANÇA <span className="italic text-brand-gold font-light block mt-1 sm:inline">no ambiente educacional:</span>
          </h2>
          <p className="font-sans text-brand-gray/80 text-base sm:text-lg max-w-3xl mx-auto leading-relaxed">
            Seja você um profissional de apoio, professor iniciante ou profissional do Atendimento Educacional Especializado em busca de formações na área de Educação Inclusiva, temos opções que podem te ajudar:
          </p>
        </div>

        {/* Grade de Capacitações */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {CAPACITACOES.map((item) => {
            const colors = colorMap[item.cor];

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-3xl border border-brand-gold/10 p-6 sm:p-8 flex flex-col justify-between shadow-xl relative overflow-hidden group hover:shadow-2xl hover:border-brand-gold/25 transition-all duration-300"
              >
                <div>
                  {/* Badge de Duração/Formato */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${colors.bg} ${colors.text}`}>
                      <Clock className="w-3 h-3" />
                      {item.duracao}
                    </span>
                  </div>

                  {/* Títulos */}
                  <h3 className="font-serif text-2xl sm:text-3xl font-semibold text-brand-gray mb-1.5 tracking-tight leading-tight group-hover:text-brand-gold transition-colors duration-300">
                    {item.titulo}
                  </h3>
                  <h4 className="font-sans text-sm font-semibold text-brand-gold/90 mb-6 leading-snug">
                    {item.subtitulo}
                  </h4>

                  {/* Descrição */}
                  <p className="font-sans text-brand-gray/70 text-sm leading-relaxed mb-6">
                    {item.descricao}
                  </p>

                  {/* Botão de Expandir/Recolher */}
                  <button
                    onClick={() => toggleExpand(item.id)}
                    className="w-full py-2.5 mb-6 border border-brand-gold/20 hover:border-brand-gold/40 hover:bg-brand-gold/5 text-brand-gold hover:text-brand-gold/80 font-semibold text-xs sm:text-sm rounded-xl flex items-center justify-center gap-2 transition-all duration-300 cursor-pointer"
                  >
                    {expandedCards[item.id] ? (
                      <>
                        Ocultar Detalhes <ChevronUp className="w-4 h-4" />
                      </>
                    ) : (
                      <>
                        Ver Conteúdo e Detalhes <ChevronDown className="w-4 h-4" />
                      </>
                    )}
                  </button>

                  {/* Detalhes expansíveis */}
                  <AnimatePresence initial={false}>
                    {expandedCards[item.id] && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        {/* O que está incluso */}
                        <div className="space-y-3 mb-8 border-t border-brand-gold/10 pt-6">
                          <h5 className="text-xs font-bold uppercase tracking-widest text-brand-gray/60 font-sans mb-3 flex items-center gap-1.5">
                            <Sparkles className="w-3.5 h-3.5 text-brand-gold" />
                            {item.id === "professora-inclusiva" ? "Diferenciais e WhatsApp" : "O que está incluso"}
                          </h5>
                          <div className="space-y-2.5">
                            {item.inclusoList.map((bullets, idx) => (
                              <div key={idx} className="flex items-start gap-2.5">
                                <div className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${colors.bg}`}>
                                  <Check className={`w-2.5 h-2.5 ${colors.text}`} />
                                </div>
                                <span className="text-xs text-brand-gray/85 font-sans leading-relaxed">
                                  {bullets}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Cronograma / Grade */}
                        <div className="space-y-3 mb-8 border-t border-brand-gold/10 pt-6">
                          <h5 className="text-xs font-bold uppercase tracking-widest text-brand-gray/60 font-sans mb-4">
                            {item.cronogramaTitulo}
                          </h5>
                          <div className="space-y-3">
                            {item.cronogramaList.map((modulo, idx) => (
                              <div key={idx} className="flex items-start gap-3">
                                <div className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 mt-0.5 text-[10px] font-bold ${colors.bg} ${colors.text}`}>
                                  {idx + 1}
                                </div>
                                <span className="text-xs text-brand-gray/80 font-sans leading-tight">
                                  {modulo}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Preço e CTA */}
                        <div className="border-t border-brand-gold/10 pt-6 mt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                          <div className="flex flex-col">
                            <span className="text-[10px] text-brand-gray/40 uppercase font-sans tracking-wider">Investimento</span>
                            <div className="flex items-baseline gap-1">
                              <span className="font-serif text-2xl sm:text-3xl font-bold text-brand-gray leading-none">{item.preco}</span>
                              {item.precoSub && (
                                <span className="text-[10px] text-brand-gray/50 font-sans italic">({item.precoSub})</span>
                              )}
                            </div>
                          </div>
                          <a
                            href={item.link}
                            target="_blank"
                            rel="noreferrer"
                            className="px-5 py-3 bg-brand-gray hover:bg-brand-gray/90 text-white font-semibold text-xs rounded-xl flex items-center justify-center gap-2 shadow-sm hover:shadow-md transition-all duration-300"
                          >
                            {item.ctaText}
                            <ArrowRight className="w-3.5 h-3.5" />
                          </a>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
