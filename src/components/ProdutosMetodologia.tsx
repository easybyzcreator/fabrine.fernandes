import { PRODUTOS } from "../types";
import { Check, Sparkles, ShoppingBag, Terminal, Monitor, Sparkle } from "lucide-react";
import { motion } from "motion/react";

export default function ProdutosMetodologia() {
  return (
    <section id="metodologia" className="py-24 bg-white relative overflow-hidden">
      {/* Decorative background shape */}
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-green/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Cabeçalho */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-green/10 text-brand-green text-xs font-semibold uppercase tracking-widest rounded-full mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            Métodos e Recursos Exclusivos
          </div>
          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl font-medium tracking-tight text-brand-gray mb-4">
            Ferramentas práticas para a <span className="italic text-brand-gold font-light">rotina em casa</span>
          </h2>
          <p className="font-sans text-brand-gray/70 text-lg">
            Sugestões práticas para as famílias e professores.
          </p>
        </div>

        {/* Grade de Produtos */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-stretch">
          {PRODUTOS.map((produto) => {
            const isBlue = produto.cor === "blue";

            return (
              <motion.div
                key={produto.id}
                whileHover={{ y: -8 }}
                transition={{ duration: 0.4 }}
                className="bg-brand-bg rounded-3xl border border-brand-gold/10 p-6 sm:p-8 flex flex-col justify-between shadow-lg relative overflow-hidden group"
              >
                {/* Glow effect on hover */}
                <div className={`absolute -top-16 -right-16 w-32 h-32 rounded-full blur-3xl opacity-20 transition-all duration-500 group-hover:scale-150 ${
                  isBlue ? "bg-brand-blue" : "bg-brand-yellow"
                }`} />

                <div>
                  {/* Tipo de recurso */}
                  <div className="flex justify-between items-start mb-6">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                      isBlue ? "bg-brand-blue/10 text-brand-blue" : "bg-brand-gold/10 text-brand-gold"
                    }`}>
                      {isBlue ? <Monitor className="w-3.5 h-3.5" /> : <Sparkle className="w-3.5 h-3.5" />}
                      {produto.tipo === "digital" ? "Estratégias de Rotina" : "Estratégias de Regulação"}
                    </span>
                    {produto.preco && (
                      <span className="font-serif text-2xl font-bold text-brand-gray/90">
                        {produto.preco}
                      </span>
                    )}
                  </div>

                  <h3 className="font-serif text-3xl font-semibold text-brand-gray mb-2">
                    {produto.titulo}
                  </h3>
                  <h4 className="font-sans text-xs font-bold tracking-widest text-brand-gold uppercase mb-6">
                    {produto.subtitulo}
                  </h4>

                  <p className="font-sans text-brand-gray/70 text-sm sm:text-base leading-relaxed mb-8">
                    {produto.descricao}
                  </p>

                  {/* Ilustração / Mockup Representativo do Produto */}
                  <div className="relative w-full h-52 bg-white rounded-2xl border border-brand-gold/5 flex flex-col items-center justify-center p-6 shadow-inner overflow-hidden mb-8">
                    
                    {/* SVG interativo que imita as fatias do cérebro do logo dela como elemento lúdico do design */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-5">
                      <img
                        src="https://raw.githubusercontent.com/easybyzcreator/imagens/17563760155e9adfc5a58f5f85a53a7de6c2d3c8/ffbb.png"
                        alt="Logo de fundo"
                        className="w-48 h-48 object-contain"
                      />
                    </div>

                    {isBlue ? (
                      /* Layout Digital do NeuroOrganiza */
                      <div className="relative w-full max-w-xs flex flex-col gap-2 scale-90 sm:scale-100 transition-transform">
                        <div className="bg-brand-blue/10 border border-brand-blue/20 p-3 rounded-xl flex items-center gap-3">
                          <div className="w-6 h-6 rounded-md bg-brand-blue flex items-center justify-center text-white text-[10px] font-bold">1</div>
                          <span className="text-xs font-semibold text-brand-gray">Rotina Matinal de Estudo</span>
                          <span className="ml-auto text-[10px] bg-brand-blue text-white px-2 py-0.5 rounded-full font-bold">75% Concluído</span>
                        </div>
                        <div className="bg-brand-rose/10 border border-brand-rose/20 p-3 rounded-xl flex items-center gap-3">
                          <div className="w-6 h-6 rounded-md bg-brand-rose flex items-center justify-center text-white text-[10px] font-bold">2</div>
                          <span className="text-xs font-semibold text-brand-gray">Pausa e Descompressão Ativa</span>
                          <span className="ml-auto text-[10px] bg-brand-rose text-white px-2 py-0.5 rounded-full font-bold">Aguardando</span>
                        </div>
                        <div className="bg-brand-green/10 border border-brand-green/20 p-3 rounded-xl flex items-center gap-3">
                          <div className="w-6 h-6 rounded-md bg-brand-green flex items-center justify-center text-white text-[10px] font-bold">3</div>
                          <span className="text-xs font-semibold text-brand-gray font-medium">Estímulo Cognitivo de Atenção</span>
                          <span className="ml-auto text-[10px] bg-brand-green text-white px-2 py-0.5 rounded-full font-bold">Feito!</span>
                        </div>
                      </div>
                    ) : (
                      /* Layout Físico do Baralho */
                      <div className="relative flex gap-4 items-center justify-center scale-90 sm:scale-100 transition-transform">
                        {/* Carta 1 */}
                        <div className="w-24 h-36 bg-gradient-to-br from-brand-gold to-brand-yellow/80 rounded-xl border-2 border-white shadow-lg flex flex-col justify-between p-2.5 rotate-[-8deg] transform origin-bottom-right z-10">
                          <span className="text-[8px] font-bold tracking-widest text-brand-gray/80 uppercase">Ativar Foco</span>
                          <div className="w-6 h-6 rounded-full bg-white/30 mx-auto flex items-center justify-center">
                            <Sparkle className="w-3.5 h-3.5 text-brand-gray" />
                          </div>
                          <span className="text-[7px] text-center font-semibold text-brand-gray leading-tight">Mova seus olhos em círculo por 10s</span>
                        </div>
                        {/* Carta 2 */}
                        <div className="w-24 h-36 bg-gradient-to-br from-brand-rose to-brand-yellow rounded-xl border-2 border-white shadow-lg flex flex-col justify-between p-2.5 rotate-[8deg] transform origin-bottom-left z-20">
                          <span className="text-[8px] font-bold tracking-widest text-white uppercase">Flexibilidade</span>
                          <div className="w-6 h-6 rounded-full bg-white/30 mx-auto flex items-center justify-center">
                            <Check className="w-3.5 h-3.5 text-white" />
                          </div>
                          <span className="text-[7px] text-center font-semibold text-white leading-tight">Diga 5 palavras que rimem com sol</span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Benefícios */}
                  <div className="space-y-3.5 mb-8">
                    <h4 className="text-xs font-bold uppercase tracking-widest text-brand-gray/50 font-sans">
                      Destaques da Metodologia:
                    </h4>
                    {produto.beneficios.map((beneficio, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                          isBlue ? "bg-brand-blue/10" : "bg-brand-gold/10"
                        }`}>
                          <Check className={`w-3 h-3 ${isBlue ? "text-brand-blue" : "text-brand-gold"}`} />
                        </div>
                        <span className="text-sm text-brand-gray/80 font-sans">
                          {beneficio}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Comprar / Saber Mais */}
                {(() => {
                  const whatsappMessage = produto.id === "funcao-executiva"
                    ? "Olá Fabrine! Estava navegando no seu site e gostaria de conversar sobre recursos práticos para apoiar o planejamento diário, reduzir a sobrecarga que trava o início das tarefas e estimular a percepção do tempo. (TDAH -  planejamento, iniciação, memória de trabalho)"
                    : "Olá Fabrine! Estava navegando no seu site e gostaria de conversar sobre estratégias focadas em antecipar rotinas de forma gentil, reduzir a ruptura brusca de atividades e auxiliar na regulação emocional. (Autismo - Antecipação, sobrecarga sensorial)";
                  return (
                    <a
                      href={`https://wa.me/5519971242720?text=${encodeURIComponent(whatsappMessage)}`}
                      target="_blank"
                      rel="noreferrer"
                      className={`w-full py-4 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-all duration-300 shadow-sm hover:shadow-md ${
                        isBlue
                          ? "bg-brand-blue text-white hover:bg-brand-blue/90"
                          : "bg-brand-gray text-white hover:bg-brand-gray/90"
                      }`}
                    >
                      <ShoppingBag className="w-4 h-4" />
                      Quero Saber Como Aplicar
                    </a>
                  );
                })()}
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
