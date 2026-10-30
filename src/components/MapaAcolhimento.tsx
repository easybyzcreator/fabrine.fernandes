import { useState } from "react";
import { Check, ArrowRight, Sparkles, Shield, Users, Layers, ChevronDown, ChevronUp, CheckCircle, HelpCircle } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { trackClick } from "../lib/firebase";

// Using direct image URLs as requested
const imgKidsTeens = "https://raw.githubusercontent.com/easybyzcreator/imagens/4c82a27acb48df4cff398dddc9833ff3ddc53fe9/mapa%20kids.png";
const imgAdults = "https://raw.githubusercontent.com/easybyzcreator/imagens/6e31dfcd1a7546da7bc04326b6ae25105d812e9b/mapa%20adulto.png";
const imgHybrid = "https://raw.githubusercontent.com/easybyzcreator/imagens/0bc46d5c7a3ba637300ea4eb97fb2d8e407c85a3/capa%20hibrido.png";

interface MapaCardData {
  id: string;
  tag: string;
  titulo: string;
  descricaoCapa: string;
  botaoTexto: string;
  imagem: string;
  paraQuem: string;
  entregas: {
    titulo: string;
    descricao: string;
  }[];
  modeloComercial: string;
  cor: "blue" | "rose" | "gold";
}

const MAPA_DATA: MapaCardData[] = [
  {
    id: "kids-teens",
    tag: "Crianças e Adolescentes",
    titulo: "M.A.P.A. Kids & Teens",
    descricaoCapa: "Perfeito para profissionais e instituições que lidam com o neurodesenvolvimento infanto-juvenil e precisam de um protocolo claro e seguro de acolhimento e manejo diário.",
    botaoTexto: "Conhecer Versão Kids & Teens",
    imagem: imgKidsTeens,
    cor: "blue",
    paraQuem: "Clínicas de Psicopedagogia, Psicologia, Terapia Ocupacional, Fonoaudiologia, Escolas (Sala de aula comum e AEE), Professores e Auxiliares de Inclusão.",
    entregas: [
      {
        titulo: "Eliminação de Gatilhos",
        descricao: "Saiba exatamente o que a criança abomina (sons, luzes, toques específicos) antes mesmo de ela entrar pela porta."
      },
      {
        titulo: "Uso Estratégico de Hiperfocos",
        descricao: "Descubra os interesses específicos (ex: dinossauros, carros) para engajar e conectar com o paciente imediatamente."
      },
      {
        titulo: "Protocolo de Segurança Anticrise",
        descricao: "Mapeia os sinais sutis de alerta (como agitar as mãos ou cobrir ouvidos) e define estratégias de autorregulação imediata, evitando abordagens inadequadas."
      }
    ],
    modeloComercial: "Taxa de configuração inicial + Mensalidades fixas (previsibilidade total para o seu caixa)."
  },
  {
    id: "adults",
    tag: "Somente Adultos",
    titulo: "M.A.P.A. Adultos",
    descricaoCapa: "Estruturação estratégica e mapeamento de perfil para o público adulto. Focado em autonomia, regulação sensorial e respeito à individualidade, otimizando o tempo de consulta e direcionando a conduta profissional com máxima precisão.",
    botaoTexto: "Conhecer Versão Adultos",
    imagem: imgAdults,
    cor: "gold",
    paraQuem: "Terapeutas, Psicólogos, Psiquiatras, Neurologistas e Profissionais de Saúde e Desenvolvimento Humano que atendem adultos neurodivergentes (TEA, TDAH, TPS).",
    entregas: [
      {
        titulo: "Otimização de Tempo",
        descricao: "Substitui anamneses longas por um painel visual de leitura rápida com o que realmente importa para a conduta diária."
      },
      {
        titulo: "Mapeamento de Sensibilidades",
        descricao: "Identifica fatores ambientais e corporais (hiper ou hiposensibilidade) que afetam o foco e a regulação emocional do adulto no ambiente."
      },
      {
        titulo: "Comunicação Eficaz",
        descricao: "Ajusta os canais preferenciais de interação desde a primeira sessão, diminuindo a ansiedade do cliente."
      }
    ],
    modeloComercial: "Taxa de configuração inicial + Mensalidades fixas."
  },
  {
    id: "hybrid",
    tag: "Crianças, Adolescentes e Adultos",
    titulo: "M.A.P.A. Híbrido",
    descricaoCapa: "A solução completa para profissionais e clínicas que atendem todas as faixas etárias. Flexibilidade total para alternar entre perfis infanto-juvenis e adultos dentro de uma única plataforma centralizada.",
    botaoTexto: "Conhecer Versão Híbrida",
    imagem: imgHybrid,
    cor: "rose",
    paraQuem: "Centros de Atendimento Multidisciplinar, Clínicas Integradas, Escolas de grande porte e profissionais autônomos com esteira de atendimento mista.",
    entregas: [
      {
        titulo: "Centralização Absoluta",
        descricao: "Reúne as ferramentas de segurança infanto-juvenil e os critérios de regulação e autonomia adulta em uma única interface."
      },
      {
        titulo: "Fim da Desorganização Visual",
        descricao: "Toda a sua equipe alinhada. Qualquer profissional consegue ler e compreender o histórico de qualquer paciente em menos de 3 minutos."
      },
      {
        titulo: "Escalabilidade do Negócio",
        descricao: "Permite expandir o escopo da sua clínica sem a necessidade de assinar múltiplos sistemas diferentes."
      }
    ],
    modeloComercial: "Taxa de configuração inicial diferenciada + Mensalidade fixa unificada (O melhor custo-benefício para estruturas mistas)."
  }
];

const PLANOS_CHS_OU_ADULTO = [
  { cadastros: "Até 30 cadastros", taxa: "3 x R$ 138,00", mensalidade: "R$ 69,90" },
  { cadastros: "31 a 50 cadastros", taxa: "3 x R$ 221,00", mensalidade: "R$ 74,90" },
  { cadastros: "51 a 100 cadastros", taxa: "3 x R$ 261,00", mensalidade: "R$ 97,00" },
  { cadastros: "101 a 300 cadastros", taxa: "3 x R$ 433,00", mensalidade: "R$ 263,00" },
  { cadastros: "301 a 500 cadastros", taxa: "3 x R$ 653,00", mensalidade: "R$ 476,00" },
  { cadastros: "501 a 1000 cadastros", taxa: "4 x R$ 673,50", mensalidade: "R$ 897,00" },
  { cadastros: "1001 a 2500 cadastros", taxa: "5 x R$ 898,20", mensalidade: "R$ 1998,00" },
];

const PLANOS_HIBRIDO = [
  { cadastros: "Até 30 cadastros", taxa: "3 x R$ 223,00", mensalidade: "R$ 99,90" },
  { cadastros: "31 a 50 cadastros", taxa: "3 x R$ 306,00", mensalidade: "R$ 118,90" },
  { cadastros: "51 a 100 cadastros", taxa: "3 x R$ 348,00", mensalidade: "R$ 149,80" },
  { cadastros: "101 a 300 cadastros", taxa: "3 x R$ 523,00", mensalidade: "R$ 331,00" },
  { cadastros: "301 a 500 cadastros", taxa: "3 x R$ 743,00", mensalidade: "R$ 527,00" },
  { cadastros: "501 a 1000 cadastros", taxa: "3 x R$ 988,00", mensalidade: "R$ 987,00" },
  { cadastros: "1001 a 2500 cadastros", taxa: "5 x R$ 952,20", mensalidade: "R$ 2238,00" },
];

export default function MapaAcolhimento() {
  const [expandedCards, setExpandedCards] = useState<Record<string, boolean>>({});
  const [selectedTiers, setSelectedTiers] = useState<Record<string, number>>({
    "kids-teens": 0,
    "adults": 0,
    "hybrid": 0
  });

  const toggleExpand = (id: string) => {
    setExpandedCards((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const corStyles = {
    blue: {
      tagBg: "bg-[#68C9EA]/10 text-[#2B7A94]",
      icon: "text-[#68C9EA]",
      border: "hover:border-[#68C9EA]/40",
      btnBg: "bg-[#68C9EA] hover:bg-[#68C9EA]/90"
    },
    gold: {
      tagBg: "bg-[#D4AF37]/10 text-[#997A15]",
      icon: "text-[#D4AF37]",
      border: "hover:border-[#D4AF37]/40",
      btnBg: "bg-[#D4AF37] hover:bg-[#D4AF37]/90"
    },
    rose: {
      tagBg: "bg-[#FA4E74]/10 text-[#C12547]",
      icon: "text-[#FA4E74]",
      border: "hover:border-[#FA4E74]/40",
      btnBg: "bg-[#FA4E74] hover:bg-[#FA4E74]/90"
    }
  };

  return (
    <section id="mapa-acolhimento" className="py-20 sm:py-28 bg-[#EFF9F0] scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Badge Indicadora do Ecossistema */}
        <div className="flex justify-center mb-6">
          <span className="px-4 py-1.5 rounded-full bg-brand-green/20 text-brand-gray text-[10px] sm:text-xs font-bold uppercase tracking-wider font-sans flex items-center gap-1.5 text-center leading-normal max-w-full">
            <Layers className="w-3.5 h-3.5 text-brand-green shrink-0" />
            ESCOLAS, AEE, CLÍNICAS, TERAPEUTAS, ESPAÇOS RECREATIVOS, ACADEMIAS, PROFISSIONAIS LIBERAIS
          </span>
        </div>

        {/* Título & Apresentação */}
        <div className="max-w-4xl mx-auto mb-16 text-center">
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-semibold text-brand-gray leading-tight tracking-tight mb-8">
            M.A.P.A. do Acolhimento®: <span className="text-brand-green">Transforme o Primeiro Contato em Conexão</span>
          </h2>
          
          <div className="space-y-6 font-sans text-base sm:text-lg text-brand-gray/80 leading-relaxed font-light text-justify sm:text-center max-w-3xl mx-auto">
            <p>
              O primeiro encontro com uma pessoa neurodivergente pode ser determinante para o sucesso do vínculo terapêutico ou pedagógico. Sem as informações certas, profissionais caminham no escuro, correndo o risco de provocar reações sensoriais, comportamentais ou emocionais de forma não intencional.
            </p>
            <p className="font-semibold text-brand-green text-lg sm:text-xl">
              O M.A.P.A. do Acolhimento® foi criado para mudar essa realidade.
            </p>
            <p>
              Baseado na metodologia da Fabrine, este mapeamento digital estratégico é preenchido pelas famílias ou responsáveis e foi desenvolvido com um objetivo claro: <span className="font-medium text-brand-gray">eliminar por completo as lacunas de informação no primeiro contato profissional.</span>
            </p>
          </div>
        </div>

        {/* Bloco de Conteúdo Indispensável & Benefícios */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 mb-16 sm:mb-20">
          
          {/* Coluna 1: Por que é indispensável */}
          <div className="bg-white/85 backdrop-blur-sm rounded-[2rem] p-6 sm:p-8 border border-brand-green/10 shadow-sm flex flex-col justify-between">
            <div>
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-brand-gray mb-4 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-brand-gold shrink-0" />
                Por que o M.A.P.A. do Acolhimento® é indispensável?
              </h3>
              <p className="font-sans text-brand-gray/75 text-xs sm:text-sm mb-6 leading-relaxed">
                Com o M.A.P.A., você decodifica com precisão as especificidades do seu cliente, paciente ou aluno antes mesmo do primeiro encontro físico. Em uma única ferramenta visual e de rápida leitura, você tem acesso a dados cruciais como:
              </p>
              
              <ul className="space-y-4 font-sans text-xs sm:text-sm text-brand-gray/80">
                <li className="flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-brand-gold/15 flex items-center justify-center shrink-0 mt-0.5">
                    <span className="w-2 h-2 rounded-full bg-brand-gold" />
                  </span>
                  <div>
                    <strong className="text-brand-gray font-semibold block">Sensibilidades Sensoriais:</strong>
                    Sons, luzes, texturas e estressores ambientais.
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-brand-gold/15 flex items-center justify-center shrink-0 mt-0.5">
                    <span className="w-2 h-2 rounded-full bg-brand-gold" />
                  </span>
                  <div>
                    <strong className="text-brand-gray font-semibold block">Seletividade Alimentar e Preferências:</strong>
                    O que traz conforto e o que gera aversão.
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-brand-gold/15 flex items-center justify-center shrink-0 mt-0.5">
                    <span className="w-2 h-2 rounded-full bg-brand-gold" />
                  </span>
                  <div>
                    <strong className="text-brand-gray font-semibold block">Canais de Comunicação:</strong>
                    Como a pessoa se expressa e compreende o ambiente ao seu redor.
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-brand-gold/15 flex items-center justify-center shrink-0 mt-0.5">
                    <span className="w-2 h-2 rounded-full bg-brand-gold" />
                  </span>
                  <div>
                    <strong className="text-brand-gray font-semibold block">Gatilhos e Sinais de Sobrecarga:</strong>
                    Previsibilidade de itens que podem provocar crises ou desorganização.
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-brand-gold/15 flex items-center justify-center shrink-0 mt-0.5">
                    <span className="w-2 h-2 rounded-full bg-brand-gold" />
                  </span>
                  <div>
                    <strong className="text-brand-gray font-semibold block">Interesses e Hiperfocos:</strong>
                    Elementos reguladores que facilitam a criação de um vínculo afetivo e seguro desde o primeiro minuto.
                  </div>
                </li>
              </ul>
            </div>
          </div>

          {/* Coluna 2: Segurança, Humanização e Previsibilidade */}
          <div className="bg-white/85 backdrop-blur-sm rounded-[2rem] p-6 sm:p-8 border border-brand-green/10 shadow-sm flex flex-col justify-between">
            <div>
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-brand-gray mb-4 flex items-center gap-2">
                <Shield className="w-5 h-5 text-brand-green shrink-0" />
                Segurança, Humanização e Previsibilidade
              </h3>
              <p className="font-sans text-brand-gray/75 text-xs sm:text-sm mb-6 leading-relaxed">
                Seja na clínica, no atendimento especializado ou na sala de aula, o M.A.P.A. do Acolhimento® permite que você:
              </p>
              
              <ul className="space-y-6 font-sans text-xs sm:text-sm text-brand-gray/80">
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-brand-green/15 flex items-center justify-center shrink-0 mt-1">
                    <CheckCircle className="w-3.5 h-3.5 text-brand-green" />
                  </div>
                  <div>
                    <strong className="text-brand-gray font-semibold block mb-0.5 text-sm sm:text-base">Antecipe-se aos gatilhos:</strong>
                    Antecipe-se aos gatilhos de crise e promova intervenções preventivas e respeitosas.
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-brand-green/15 flex items-center justify-center shrink-0 mt-1">
                    <CheckCircle className="w-3.5 h-3.5 text-brand-green" />
                  </div>
                  <div>
                    <strong className="text-brand-gray font-semibold block mb-0.5 text-sm sm:text-base">Preparo do ambiente:</strong>
                    Prepare o ambiente com antecedência, removendo distratores e incluindo elementos reguladores.
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-brand-green/15 flex items-center justify-center shrink-0 mt-1">
                    <CheckCircle className="w-3.5 h-3.5 text-brand-green" />
                  </div>
                  <div>
                    <strong className="text-brand-gray font-semibold block mb-0.5 text-sm sm:text-base">Construa um vínculo inabalável:</strong>
                    Ofereça um acolhimento genuinamente humanizado e focado na singularidade de cada indivíduo.
                  </div>
                </li>
              </ul>
            </div>
            
            <div className="mt-8 pt-6 border-t border-brand-green/10">
              <p className="font-sans text-xs text-brand-gray/70 italic">
                * Mais do que uma ficha de informações, o M.A.P.A. é um ato de respeito e uma ponte de confiança entre a família, a equipe profissional e a pessoa neurodivergente.
              </p>
            </div>
          </div>

        </div>

        {/* Mensagem de Chamada antes dos cards */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <p className="font-sans text-base sm:text-lg text-brand-gray/90 font-medium italic mb-4">
            "Mais do que uma ficha de informações, o M.A.P.A. é um ato de respeito e uma ponte de confiança entre a família, a equipe profissional e a pessoa neurodivergente."
          </p>
          <p className="font-serif text-xl sm:text-2xl text-brand-green font-bold">
            Leve mais previsibilidade e empatia para a sua prática diária!
          </p>
          <div className="w-24 h-0.5 bg-brand-gold/30 mx-auto mt-6" />
        </div>

        {/* Título da seção das Versões do MAPA */}
        <div className="text-center mb-10">
          <h3 className="font-serif text-2xl sm:text-3xl font-semibold text-brand-gray">
            Conheça as Versões Disponíveis do M.A.P.A.
          </h3>
          <p className="font-sans text-xs sm:text-sm text-brand-gray/60 mt-2">
            Escolha o modelo que melhor se adapta à sua estrutura e necessidade de atendimento
          </p>
        </div>

        {/* Três Colunas de Cards (Padrão "Our Rooms") */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {MAPA_DATA.map((item) => {
            const styles = corStyles[item.cor];
            const isExpanded = !!expandedCards[item.id];

            return (
              <motion.div
                key={item.id}
                layout="position"
                id={`mapa-card-${item.id}`}
                className={`bg-white rounded-[2rem] p-4 pb-6 sm:p-5 sm:pb-8 shadow-xl shadow-brand-gray/5 border border-brand-gold/5 ${styles.border} transition-all duration-500 flex flex-col`}
              >
                {/* Imagem do Card (Padrão "Our Rooms") */}
                <div className="aspect-[4/3] rounded-[1.5rem] overflow-hidden mb-6 relative group">
                  <img
                    src={item.imagem}
                    alt={item.titulo}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  {/* Overlay gradiente suave */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
                </div>

                {/* Tag e Título */}
                <div className="flex flex-col gap-2.5 mb-4">
                  <div className="flex items-center justify-between">
                    <span className={`px-3 py-1 rounded-full text-[11px] font-bold tracking-wide font-sans ${styles.tagBg}`}>
                      {item.tag}
                    </span>
                  </div>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-brand-gray tracking-wide">
                    {item.titulo}
                  </h3>
                </div>

                {/* Descrição de Capa do Card */}
                <p className="font-sans text-brand-gray/70 text-xs sm:text-sm leading-relaxed mb-6 flex-grow">
                  {item.descricaoCapa}
                </p>

                {/* Botão de Expandir/Recolher Detalhes */}
                <button
                  onClick={() => toggleExpand(item.id)}
                  className="w-full py-3 mb-4 border border-brand-gold/20 hover:border-brand-gold/40 hover:bg-brand-gold/5 text-brand-gold hover:text-brand-gold/80 font-semibold text-xs sm:text-sm rounded-xl flex items-center justify-center gap-2 transition-all duration-300 cursor-pointer"
                >
                  <span>{isExpanded ? "Ocultar Detalhes" : item.botaoTexto}</span>
                  {isExpanded ? (
                    <ChevronUp className="w-4 h-4" />
                  ) : (
                    <ChevronDown className="w-4 h-4" />
                  )}
                </button>

                {/* Conteúdo Expansível com Framer Motion */}
                <AnimatePresence initial={false}>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      {/* Para quem é */}
                      <div className="pt-4 border-t border-brand-gold/10 mb-5">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-brand-gray/50 font-sans block mb-1.5">
                          Para quem é:
                        </span>
                        <p className="font-sans text-brand-gray/85 text-xs leading-relaxed">
                          {item.paraQuem}
                        </p>
                      </div>

                      {/* Entregas Práticas */}
                      <div className="space-y-4 mb-5">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-brand-gray/50 font-sans block">
                          O que ele entrega na prática:
                        </span>
                        <div className="space-y-3">
                          {item.entregas.map((entrega, idx) => (
                            <div key={idx} className="flex items-start gap-2.5">
                              <div className="w-4 h-4 rounded-full bg-brand-gold/10 flex items-center justify-center shrink-0 mt-0.5">
                                <CheckCircle className="w-2.5 h-2.5 text-brand-gold" />
                              </div>
                              <div className="flex flex-col">
                                <strong className="text-brand-gray text-xs font-semibold leading-tight mb-0.5">
                                  {entrega.titulo}
                                </strong>
                                <span className="text-brand-gray/70 text-xs leading-relaxed">
                                  {entrega.descricao}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Seletor de Planos */}
                      {(() => {
                        const planos = item.id === "hybrid" ? PLANOS_HIBRIDO : PLANOS_CHS_OU_ADULTO;
                        const planoAtualIdx = selectedTiers[item.id] ?? 0;
                        const planoAtual = planos[planoAtualIdx] || planos[0];

                        return (
                          <>
                            <div className="bg-[#FAF4EE] rounded-xl p-4 border border-brand-gold/25 mb-6 space-y-4">
                              <div className="flex flex-col gap-1.5">
                                <label htmlFor={`tier-select-${item.id}`} className="text-[11px] font-bold uppercase tracking-wider text-brand-gray/60 font-sans">
                                  Selecione o plano ideal para você:
                                </label>
                                <div className="relative">
                                  <select
                                    id={`tier-select-${item.id}`}
                                    value={planoAtualIdx}
                                    onChange={(e) => setSelectedTiers(prev => ({ ...prev, [item.id]: parseInt(e.target.value) }))}
                                    className="w-full bg-white border border-brand-gold/20 hover:border-brand-gold/40 rounded-lg px-3 py-2 font-sans text-xs text-brand-gray font-semibold focus:outline-none focus:ring-1 focus:ring-brand-gold appearance-none cursor-pointer pr-8"
                                  >
                                    {planos.map((p, idx) => (
                                      <option key={idx} value={idx}>
                                        {p.cadastros}
                                      </option>
                                    ))}
                                  </select>
                                  <div className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-brand-gold">
                                    <ChevronDown className="w-4 h-4" />
                                  </div>
                                </div>
                              </div>

                              {/* Valores do Plano Selecionado */}
                              <div className="grid grid-cols-2 gap-3 pt-3 border-t border-brand-gold/10">
                                <div>
                                  <span className="text-[9px] font-bold uppercase tracking-wider text-brand-gray/50 block mb-0.5">
                                    Taxa de Configuração
                                  </span>
                                  <span className="font-sans text-sm font-bold text-brand-gray block">
                                    {planoAtual.taxa}
                                  </span>
                                </div>
                                <div>
                                  <span className="text-[9px] font-bold uppercase tracking-wider text-brand-gray/50 block mb-0.5">
                                    Mensalidade
                                  </span>
                                  <span className="font-sans text-sm font-bold text-brand-green block">
                                    {planoAtual.mensalidade}
                                  </span>
                                </div>
                              </div>

                              {/* Informação sobre Contrato e Renovação */}
                              <div className="pt-2 border-t border-brand-gold/5 flex flex-col gap-1">
                                <span className="text-[10px] text-brand-gold font-semibold flex items-center gap-1.5">
                                  <span className="w-1.5 h-1.5 rounded-full bg-brand-gold shrink-0" />
                                  Contrato anual com renovação automática
                                </span>
                              </div>
                            </div>

                            {/* CTA para contratar ou saber mais */}
                            <a
                              href={`https://wa.me/5519997474575?text=${encodeURIComponent(
                                `Oi Pati, estava no site da Fabrine Fernandes e tenho interesse em adquirir o ${item.titulo} no plano de ${planoAtual.cadastros} (Taxa de Configuração: ${planoAtual.taxa}, Mensalidade: ${planoAtual.mensalidade}).`
                              )}`}
                              target="_blank"
                              rel="noreferrer"
                              onClick={() => trackClick(`M.A.P.A.: ${item.titulo} - ${planoAtual.cadastros}`, "whatsapp")}
                              className={`w-full py-3.5 text-white font-semibold text-xs sm:text-sm rounded-xl flex items-center justify-center gap-2 shadow-md transition-all duration-300 cursor-pointer ${styles.btnBg}`}
                            >
                              Quero adquirir essa opção
                            </a>
                          </>
                        );
                      })()}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* Seção Recomendado Para */}
        <div className="mt-20 bg-white/80 backdrop-blur-sm rounded-[2rem] p-6 sm:p-10 border border-brand-green/10 shadow-sm max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8 mb-8 border-b border-brand-green/10 pb-6">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-brand-green/15 text-brand-gray text-[11px] font-bold uppercase tracking-wider rounded-full self-start md:self-auto font-sans shrink-0">
              <Users className="w-3.5 h-3.5 text-brand-green shrink-0" />
              RECOMENDADO PARA
            </span>
            <p className="font-serif text-lg sm:text-xl font-medium text-brand-gray/90 leading-normal">
              Como o M.A.P.A. do Acolhimento® apoia os diferentes agentes do ecossistema:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Escolas & AEE */}
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2.5">
                <span className="w-2.5 h-2.5 rounded-full bg-brand-green shrink-0" />
                <h4 className="font-serif font-bold text-lg text-brand-gray">
                  Escolas & AEE
                </h4>
              </div>
              <p className="font-sans text-brand-gray/80 text-sm leading-relaxed">
                Ofereça um primeiro passo para organizar a adaptação escolar de forma humanizada, segura e preparada antes mesmo do sininho tocar.
              </p>
            </div>

            {/* Clínicas & Terapeutas */}
            <div className="flex flex-col gap-3 border-t md:border-t-0 md:border-x border-brand-green/10 pt-6 md:pt-0 md:px-6">
              <div className="flex items-center gap-2.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#68C9EA] shrink-0" />
                <h4 className="font-serif font-bold text-lg text-brand-gray">
                  Clínicas & Terapeutas
                </h4>
              </div>
              <p className="font-sans text-brand-gray/80 text-sm leading-relaxed">
                Garanta atendimentos mais previsíveis, acelere a criação do vínculo e elimine os pontos cegos do primeiro contato.
              </p>
            </div>

            {/* Espaços recreativos, Academias... */}
            <div className="flex flex-col gap-3 border-t md:border-t-0 pt-6 md:pt-0">
              <div className="flex items-center gap-2.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#D4AF37] shrink-0" />
                <h4 className="font-serif font-bold text-lg text-brand-gray">
                  Espaços & Redes de Apoio
                </h4>
              </div>
              <p className="font-sans text-brand-gray/80 text-sm leading-relaxed">
                Espaços recreativos, Academias, Profissionais liberais, Redes de apoio: A ponte perfeita para garantir que as necessidades do seu filho ou acolhido sejam respeitadas em qualquer ambiente.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
