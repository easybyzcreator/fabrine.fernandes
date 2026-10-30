import { LIVROS } from "../types";
import { BookOpen, Sparkles, Star, Heart, ArrowUpRight } from "lucide-react";
import { motion } from "motion/react";

export default function LivrosObras() {
  return (
    <section id="livros" className="py-24 bg-white relative overflow-hidden">
      {/* Decorative colored blobs in background */}
      <div className="absolute top-1/3 right-0 w-80 h-80 bg-brand-rose/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/3 left-0 w-80 h-80 bg-brand-yellow/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Cabeçalho */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-yellow/20 text-brand-gold text-xs font-semibold uppercase tracking-widest rounded-full mb-4">
            <BookOpen className="w-3.5 h-3.5" />
            Obras Literárias e Práticas
          </div>
          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl font-medium tracking-tight text-brand-gray mb-4">
            Livros para entender mais sobre <span className="italic text-brand-gold font-light">Educação Inclusiva</span>
          </h2>
          <p className="font-sans text-brand-gray/70 text-lg">
            Guias práticos elaborados pela Fabrine Fernandes para descomplicar a Ed. Inclusiva com base em evidências da neurociência, trazendo um abraço acolhedor e soluções reais para as dúvidas mais complexas do dia a dia.
          </p>
        </div>

        {/* Grade de Livros */}
        <div className="space-y-24">
          {LIVROS.map((livro, idx) => {
            const isRose = livro.cor === "rose";
            const isBlue = livro.cor === "blue";
            const isGold = livro.cor === "gold";

            const coverBg = isRose
              ? "bg-gradient-to-br from-brand-rose via-brand-rose to-[#d13a5a]"
              : isBlue
              ? "bg-gradient-to-br from-[#4fa9c6] via-brand-blue to-[#2d8ea8]"
              : "bg-gradient-to-br from-[#dfb15b] via-brand-yellow to-[#c69a47]";

            const badgeStyle = isRose
              ? "bg-brand-rose/10 text-brand-rose"
              : isBlue
              ? "bg-brand-blue/10 text-brand-blue"
              : "bg-brand-gold/10 text-brand-gold";

            const isEven = idx % 2 === 0;

            return (
              <div
                key={livro.id}
                className={`grid grid-cols-1 lg:grid-cols-12 gap-12 sm:gap-16 items-center ${
                  isEven ? "" : "lg:flex-row-reverse"
                }`}
              >
                
                {/* Visual do Livro 3D (Coluna de Mockup) - lg:col-span-5 */}
                <div className={`lg:col-span-5 flex justify-center ${isEven ? "lg:order-1" : "lg:order-2"}`}>
                  <motion.div
                    whileHover={{ scale: 1.03, rotateY: -15, perspective: 1000 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="relative w-60 h-80 sm:w-64 sm:h-96 group cursor-pointer"
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    {/* Shadow behind the book */}
                    <div className="absolute -inset-1 bg-gradient-to-r from-brand-gray/5 to-brand-gray/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300 pointer-events-none" />

                    {/* Capa do Livro (Mockup 3D) */}
                    <div className={`absolute inset-0 rounded-2xl overflow-hidden shadow-2xl border-l-8 border-brand-gray flex flex-col justify-between text-white ${livro.imagem ? "bg-white" : coverBg + " p-6"}`}>
                      {livro.imagem ? (
                        <div className="w-full h-full relative">
                          <img
                            src={livro.imagem}
                            alt={livro.titulo}
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover"
                          />
                          {/* Lombada lateral simulando o 3D (Spine edge overlay) */}
                          <div className="absolute top-0 left-0 bottom-0 w-2.5 bg-gradient-to-r from-black/25 via-black/10 to-transparent pointer-events-none" />
                        </div>
                      ) : (
                        <>
                          {/* Logo / Cérebro sutil no topo */}
                          <div className="flex justify-between items-center">
                            <span className="text-[9px] tracking-[0.2em] font-sans font-bold uppercase opacity-80">
                              Método Fabrine
                            </span>
                            <BookOpen className="w-4 h-4 opacity-75" />
                          </div>

                          {/* Título Principal no Livro */}
                          <div className="my-auto">
                            <h3 className="font-serif text-2xl sm:text-3xl font-bold leading-tight mb-2 tracking-wide drop-shadow-md">
                              {livro.titulo}
                            </h3>
                            <p className="font-sans text-[10px] sm:text-xs text-white/80 line-clamp-3 leading-relaxed">
                              {livro.subtitulo}
                            </p>
                          </div>

                          {/* Rodapé do Livro (Autora) */}
                          <div className="flex justify-between items-end border-t border-white/20 pt-4">
                            <div>
                              <span className="text-[8px] font-bold uppercase tracking-widest text-white/60 block">Autora</span>
                              <span className="font-serif text-xs font-semibold text-white/95">Dra. Fabrine</span>
                            </div>
                            <span className="text-[10px] font-mono tracking-wider opacity-60">
                              {livro.paginas} págs
                            </span>
                          </div>

                          {/* Lombada lateral simulando o 3D (Spine edge overlay) */}
                          <div className="absolute top-0 left-0 bottom-0 w-2.5 bg-gradient-to-r from-black/20 via-black/10 to-transparent pointer-events-none" />
                        </>
                      )}
                    </div>

                    {/* Badge Destaque no Livro */}
                    <div className="absolute -top-4 -right-4 bg-brand-gray text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full shadow-lg border border-white flex items-center gap-1">
                      <Star className="w-3 h-3 text-brand-yellow fill-brand-yellow" />
                      {livro.id === "livro-desafios" ? "Best-Seller" : "E-Book"}
                    </div>
                  </motion.div>
                </div>

                {/* Conteúdo Detalhado do Livro - lg:col-span-7 */}
                <div className={`lg:col-span-7 flex flex-col justify-center ${isEven ? "lg:order-2" : "lg:order-1"}`}>
                  
                  {/* Categoria/Destaque */}
                  <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-widest mb-6 w-fit ${badgeStyle}`}>
                    <Sparkles className="w-3.5 h-3.5" />
                    {livro.destaque}
                  </div>

                  <h3 className="font-serif text-3xl sm:text-4xl md:text-5xl font-semibold text-brand-gray leading-tight mb-2">
                    {livro.titulo}
                  </h3>
                  <h4 className="font-sans text-xs font-bold tracking-widest text-brand-gold uppercase mb-6">
                    {livro.subtitulo}
                  </h4>

                  <p className="font-sans text-brand-gray/80 text-base leading-relaxed mb-6">
                    {livro.descricao}
                  </p>

                  {/* Sinopse em destaque acolhedor */}
                  <div className="bg-brand-bg border-l-4 border-brand-gold p-5 rounded-r-2xl mb-8">
                    <h5 className="font-serif text-sm font-bold text-brand-gray uppercase tracking-wider mb-2 flex items-center gap-1.5">
                      <Heart className="w-4 h-4 text-brand-rose fill-brand-rose" /> Sinopse da Obra
                    </h5>
                    <p className="font-sans text-brand-gray/70 text-sm leading-relaxed italic">
                      "{livro.sinopse}"
                    </p>
                  </div>

                  {/* Preço e CTA */}
                  <div className="flex items-center gap-6 border-t border-brand-gold/10 pt-6">
                    <div>
                      <span className="text-xs text-brand-gray/40 uppercase font-sans tracking-wider block mb-1">Preço do Exemplar</span>
                      <span className="font-serif text-3xl font-bold text-brand-gray">{livro.preco}</span>
                    </div>
                    
                    <a
                      href={`https://wa.me/5519971242720?text=Olá%20Fabrine!%20Gostaria%20de%20comprar%20o%20livro%20"${encodeURIComponent(livro.titulo)}".`}
                      target="_blank"
                      rel="noreferrer"
                      className="px-6 py-3.5 bg-brand-gray hover:bg-brand-gray/90 text-white font-semibold text-sm rounded-xl flex items-center gap-2 shadow-md transition-all duration-300"
                    >
                      Comprar Meu Exemplar
                      <ArrowUpRight className="w-4 h-4" />
                    </a>
                  </div>

                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
