import React from "react";
import { ClipboardList, Brain, FileCheck, Heart, GraduationCap, Check, MessageSquare } from "lucide-react";
import { motion } from "motion/react";
import { trackClick } from "../lib/firebase";

export default function Processo() {
  const handleWhatsAppClick = async () => {
    try {
      await trackClick("Dúvidas sobre o Processo", "whatsapp");
    } catch (e) {
      console.error("Erro ao registrar trackClick:", e);
    }
    const text = "Olá Fabrine! Eu estava no seu site e gostaria de tirar algumas dúvidas sobre como funciona o processo de avaliação e intervenção psicopedagógica.";
    const encodedText = encodeURIComponent(text);
    window.open(`https://wa.me/5519971242720?text=${encodedText}`, "_blank");
  };

  const steps = [
    {
      number: "01",
      title: "Primeiro Contato & Anamnese",
      description: "Uma conversa acolhedora com os pais ou responsáveis para escutar atenta e sensivelmente a história de vida da criança, suas dificuldades escolares, marcos de desenvolvimento e potenciais.",
      bullets: [
        "Escuta sensível e sem julgamentos",
        "Investigação do histórico escolar",
        "Definição das metas iniciais de investigação"
      ],
      icon: ClipboardList,
    },
    {
      number: "02",
      title: "Avaliação Psicopedagógica",
      description: "Aplicação de instrumentos lúdicos e clínicos padronizados ao longo de 8 a 10 sessões individuais com a criança/ adolescente. Mapeamos, entre outras coisas, os estilos de aprendizagem, as habilidades necessárias ao aprendizado como alfabetização, leitura, escrita, habilidades de raciocínio lógico, atenção seletiva, memória de trabalho.",
      bullets: [
        "Testes de atenção, memória auditiva e raciocínio lógico",
        "Avaliação qualitativa de leitura e escrita",
        "Avaliação Padronizada"
      ],
      icon: Brain,
    },
    {
      number: "03",
      title: "Sessão de Devolutiva",
      description: "Encontro com a família para apresentar o resultado da Avaliação especializada com apresentação do Parecer Psicopedagógico detalhado. Explicamos didaticamente os resultados e traçamos o Plano de Desenvolvimento Individualizado (PDI).",
      bullets: [
        "Parecer completo com os resultados da avaliação realizada",
        "Orientações práticas personalizadas para rotinas em casa",
        "Sugestões de encaminhamentos multiprofissionais"
      ],
      extraText: "O Parecer é um documento bem completo que traz os resultados da avaliação realizada, Orientações práticas para rotinas em casa (quando necessário), e sugestões de encaminhamentos multiprofissional.",
      icon: FileCheck,
    },
    {
      number: "04",
      title: "Intervenção Sistemática",
      description: "Sessões semanais personalizadas de acordo com as necessidades reais da criança. Uso de jogos com finalidade terapêutica, e/ou outros recursos que possam auxiliar no desenvolvimento da aprendizagem.",
      bullets: [
        "Estimulação cognitiva e de funções executivas",
        "Alfabetização afetiva e lúdica",
        "Psicopedagogia baseada nos princípios da ciência da Análise do Comportamento Aplicada (ABA)"
      ],
      icon: Heart,
    },
    {
      number: "05",
      title: "Acompanhamento & Parceria Escolar",
      description: "Realização de reuniões técnicas com a escola da criança para alinhar o trabalho junto a professores, coordenadores e auxiliares na adequação curricular (quando necessário), unindo família, clínica e escola.",
      bullets: [
        "Reuniões de alinhamento com professores",
        "Exemplos de adaptação prática de materiais avaliativos",
        "Monitoramento constante do progresso em sala"
      ],
      icon: GraduationCap,
    }
  ];

  return (
    <section id="processo" className="py-24 bg-[#FAF5F0] relative overflow-hidden">
      {/* Elementos decorativos de fundo */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-brand-rose/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-brand-gold/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Cabeçalho */}
        <div className="text-center max-w-4xl mx-auto mb-20">
          <span className="text-brand-rose text-xs font-bold uppercase tracking-[0.2em] font-sans block mb-4">
            COMO FUNCIONA O PROCESSO
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl font-medium tracking-tight text-brand-gray mb-8">
            Uma jornada de <span className="text-brand-rose italic font-light">acolhimento</span> e <span className="font-serif italic font-light text-brand-gold">resultados claros</span>
          </h2>
          <div className="max-w-3xl mx-auto font-sans text-brand-gray/70 text-base sm:text-lg leading-relaxed flex flex-col gap-4">
            <p className="font-semibold text-brand-gray/80">
              Aqui nossa equipe trabalha com procedimentos estruturados para chegar a resultados Claros.
            </p>
            <p>
              Nossos protocolos de atendimento unem a neuropsicopedagogia, evidências científicas da área de aprendizagem e comportamento e muito acolhimento, não só para as crianças, mas também para suas famílias para criar o densenvolvimento de aprendizagens significativas.
            </p>
          </div>
        </div>

        {/* Grade de Etapas */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16 items-start max-w-6xl mx-auto">
          {steps.map((step, idx) => {
            const IconComponent = step.icon;
            return (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="flex flex-col sm:flex-row gap-6 items-start group"
              >
                {/* Ícone Circular com Número */}
                <div className="relative shrink-0 mx-auto sm:mx-0">
                  <div className="w-16 h-16 rounded-full bg-brand-rose/10 border border-brand-rose/20 flex items-center justify-center text-brand-rose transition-all duration-300 group-hover:scale-110 shadow-sm">
                    <IconComponent className="w-7 h-7" />
                  </div>
                  <span className="absolute -top-1.5 -right-1.5 bg-brand-gray text-white w-5.5 h-5.5 rounded-full flex items-center justify-center text-[10px] font-bold shadow-md">
                    {step.number}
                  </span>
                </div>

                {/* Textos */}
                <div className="flex-1 text-center sm:text-left">
                  <h3 className="font-serif text-2xl font-bold text-brand-gray mb-3 transition-colors group-hover:text-brand-rose duration-300">
                    {step.title}
                  </h3>
                  <p className="font-sans text-sm sm:text-base text-brand-gray/70 leading-relaxed mb-4">
                    {step.description}
                  </p>

                  {/* Detalhes / Checklist */}
                  <ul className="space-y-2.5 text-left inline-block sm:block">
                    {step.bullets.map((bullet, bIdx) => (
                      <li key={bIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-brand-gray/85 leading-relaxed font-sans">
                        <Check className="w-4 h-4 text-brand-rose shrink-0 mt-0.5" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Texto de Apoio Extra (especialmente para Devolutiva) */}
                  {step.extraText && (
                    <p className="mt-4 p-3.5 rounded-xl bg-white/50 border border-brand-gold/10 text-xs text-brand-gray/65 italic leading-relaxed font-sans">
                      {step.extraText}
                    </p>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Card CTA Final */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto mt-24 bg-white rounded-3xl p-8 sm:p-10 border border-brand-gold/15 shadow-xl text-center relative overflow-hidden"
        >
          {/* Subtle decoration inside the card */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-brand-rose/5 rounded-full blur-2xl pointer-events-none" />

          <h3 className="font-serif text-xl sm:text-2xl font-semibold text-brand-gray mb-4 flex items-center justify-center gap-2">
            <span className="text-brand-rose">❤️</span> Aprender com afeto, desenvolver com propósito
          </h3>
          <p className="font-sans text-sm sm:text-base text-brand-gray/70 leading-relaxed mb-8 max-w-2xl mx-auto">
            Tem alguma dúvida sobre qual etapa é a ideal para o momento do seu filho ou aluno? Clique abaixo e fale diretamente com a psicopedagoga Fabrine.
          </p>

          <button
            onClick={handleWhatsAppClick}
            className="inline-flex items-center justify-center gap-2 py-3.5 px-8 bg-brand-rose hover:bg-brand-rose/90 text-white font-bold text-xs sm:text-sm uppercase tracking-wider rounded-full shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5"
          >
            <MessageSquare className="w-5 h-5 fill-current" />
            Tirar dúvidas pelo WhatsApp
          </button>
        </motion.div>

      </div>
    </section>
  );
}
