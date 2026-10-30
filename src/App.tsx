import Navbar from "./components/Navbar";
import ScrollMorphHero from "./components/ScrollMorphHero";
import FraseDestaque from "./components/FraseDestaque";
import CartaAcolhedora from "./components/CartaAcolhedora";
import Sobre from "./components/Sobre";
import Atendimentos from "./components/Atendimentos";
import Processo from "./components/Processo";
import ProdutosMetodologia from "./components/ProdutosMetodologia";
import MentoriasCursos from "./components/MentoriasCursos";
import MapaAcolhimento from "./components/MapaAcolhimento";
import Depoimentos from "./components/Depoimentos";
import Contato from "./components/Contato";
import AdminDashboard from "./components/AdminDashboard";
import { Brain, Heart, ArrowUp, Instagram, MessageSquare, Facebook, Youtube, Mail, Phone, MapPin } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

export default function App() {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [currentHash, setCurrentHash] = useState(window.location.hash);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleHashChange = () => {
      setCurrentHash(window.location.hash);
    };
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const isAdmin = currentHash === "#/admin" || currentHash === "#admin";

  if (isAdmin) {
    return <AdminDashboard />;
  }

  return (
    <div className="bg-brand-bg text-brand-gray min-h-screen selection:bg-brand-gold/20 selection:text-brand-gray relative">
      {/* Barra de Navegação Superior */}
      <Navbar />

      {/* Hero com Animação no Scroll (Scroll-Morph) */}
      <ScrollMorphHero />

      {/* Bloco de Destaque com Frase de Efeito */}
      <FraseDestaque />

      {/* Carta Aberta Acolhedora aos Pais */}
      <CartaAcolhedora />

      {/* Quem é ela / Biografia */}
      <Sobre />

      {/* Atendimentos Clínicos e Online */}
      <Atendimentos />

      {/* Como Funciona o Processo */}
      <Processo />

      {/* Produtos e Sistemas Pedagógicos criados com a Metodologia */}
      <ProdutosMetodologia />

      {/* Mentorias Parentais e Cursos Gravados */}
      <MentoriasCursos />

      {/* Ecossistema Digital M.A.P.A. do Acolhimento */}
      <MapaAcolhimento />

      {/* Bloco de Depoimentos */}
      <Depoimentos />

      {/* Triagem e Informações de Contato / WhatsApp */}
      <Contato />

      {/* Rodapé Premium */}
      <footer className="bg-[#C97D81] text-white py-16 border-t border-white/10 relative overflow-hidden">
        {/* Decorative subtle texture/blur */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-white/5 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-black/5 rounded-full blur-2xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start mb-16">
            
            {/* Coluna 1 - Assinatura / Logo */}
            <div className="md:col-span-5 flex flex-col gap-4">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full overflow-hidden flex items-center justify-center bg-white shadow-md border-2 border-white/25">
                  <img
                    src="https://raw.githubusercontent.com/easybyzcreator/imagens/17563760155e9adfc5a58f5f85a53a7de6c2d3c8/ffbb.png"
                    alt="Logo Fabrine Fernandes"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-contain p-1"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="font-serif text-2xl font-bold tracking-wide text-white leading-tight">
                    Fabrine Fernandes
                  </span>
                  <span className="text-[10px] tracking-[0.18em] uppercase text-white/80 font-sans font-semibold">
                    CLÍNICA & CONSULTORIA PEDAGÓGICA
                  </span>
                </div>
              </div>
              
              <p className="text-xs sm:text-sm text-white/85 leading-relaxed font-sans max-w-sm">
                Espaço de estimulação cognitiva, psicopedagogia e intervenção voltado para o acolhimento afetivo e o desenvolvimento de aprendizagens significativas de cada ser humano.
              </p>

              <div>
                <span className="text-[11px] font-sans font-bold uppercase tracking-[0.15em] text-white/90 block mb-3">
                  Siga nas Redes Sociais
                </span>
                <div className="flex gap-3">
                  <a
                    href="https://www.instagram.com/psicofabrinefernandes/"
                    target="_blank"
                    rel="noreferrer"
                    title="Instagram"
                    className="w-9 h-9 rounded-full border border-white/30 hover:bg-white hover:text-[#C97D81] flex items-center justify-center transition-all duration-300 text-white shadow-sm"
                  >
                    <Instagram className="w-4 h-4" />
                  </a>
                  <a
                    href="https://www.facebook.com/fabrineneuropsico"
                    target="_blank"
                    rel="noreferrer"
                    title="Facebook"
                    className="w-9 h-9 rounded-full border border-white/30 hover:bg-white hover:text-[#C97D81] flex items-center justify-center transition-all duration-300 text-white shadow-sm"
                  >
                    <Facebook className="w-4 h-4" />
                  </a>
                  <a
                    href="https://www.youtube.com/@psicopedagoga.fabrine9631"
                    target="_blank"
                    rel="noreferrer"
                    title="YouTube"
                    className="w-9 h-9 rounded-full border border-white/30 hover:bg-white hover:text-[#C97D81] flex items-center justify-center transition-all duration-300 text-white shadow-sm"
                  >
                    <Youtube className="w-4 h-4" />
                  </a>
                  <a
                    href="https://open.spotify.com/show/0343kggLEe9BJ3aFZPjZOq"
                    target="_blank"
                    rel="noreferrer"
                    title="Spotify"
                    className="w-9 h-9 rounded-full border border-white/30 hover:bg-white hover:text-[#C97D81] flex items-center justify-center transition-all duration-300 text-white shadow-sm"
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.49 17.306c-.215.353-.676.465-1.028.249-2.813-1.718-6.357-2.107-10.53-1.153-.403.093-.81-.16-.903-.563-.093-.404.16-.81.563-.903 4.568-1.044 8.477-.6 11.649 1.34.352.215.465.676.249 1.029zm1.464-3.264c-.27.44-.847.581-1.288.311-3.22-1.98-8.13-2.553-11.938-1.397-.497.15-1.02-.132-1.171-.629-.15-.497.132-1.02.629-1.171 4.356-1.322 9.77-.677 13.457 1.59.44.27.581.847.311 1.288zm.126-3.41c-3.86-2.292-10.222-2.505-13.917-1.383-.593.18-1.22-.155-1.4-.748-.18-.593.155-1.22.748-1.4 4.254-1.291 11.272-1.045 15.713 1.593.533.317.708 1.01.392 1.543-.317.533-1.01.708-1.543.392z"/>
                    </svg>
                  </a>
                  <a
                    href={`https://wa.me/5519971242720?text=${encodeURIComponent("Olá Fabrine! Estava navegando no seu site e gostaria de conversar com você.")}`}
                    target="_blank"
                    rel="noreferrer"
                    title="WhatsApp"
                    className="w-9 h-9 rounded-full border border-white/30 hover:bg-white hover:text-[#C97D81] flex items-center justify-center transition-all duration-300 text-white shadow-sm"
                  >
                    <svg className="w-4.5 h-4.5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.458 5.706 1.459h.008c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            {/* Coluna 2 - Navegação */}
            <div className="md:col-span-3 flex flex-col gap-4">
              <h4 className="font-sans text-sm font-bold uppercase tracking-[0.2em] text-white border-b border-white/20 pb-2.5">
                Navegação
              </h4>
              <div className="flex flex-col gap-2.5 text-sm text-white/90 font-sans">
                <a href="#sobre" className="hover:text-brand-yellow hover:translate-x-1 transition-all duration-200 block">• Sobre</a>
                <a href="#atendimentos" className="hover:text-brand-yellow hover:translate-x-1 transition-all duration-200 block">• Atendimentos</a>
                <a href="#metodologia" className="hover:text-brand-yellow hover:translate-x-1 transition-all duration-200 block">• Metodologia</a>
                <a href="#mentorias-cursos" className="hover:text-brand-yellow hover:translate-x-1 transition-all duration-200 block">• Cursos e Capacitações</a>
                <a href="#mapa-acolhimento" className="hover:text-brand-yellow hover:translate-x-1 transition-all duration-200 block">• M.A.P.A. Inclusão</a>
              </div>
            </div>

            {/* Coluna 3 - Contato Direto */}
            <div className="md:col-span-4 flex flex-col gap-5">
              <h4 className="font-sans text-sm font-bold uppercase tracking-[0.2em] text-white border-b border-white/20 pb-2.5">
                Contato Direto
              </h4>
              
              <div className="flex gap-3 items-start">
                <Phone className="w-5 h-5 text-white/80 shrink-0 mt-0.5" />
                <div className="flex flex-col">
                  <span className="text-[10px] tracking-widest text-white/70 font-bold uppercase">
                    Telefone / WhatsApp
                  </span>
                  <a
                    href={`https://wa.me/5519971242720?text=${encodeURIComponent("Olá Fabrine! Estava navegando no seu site e gostaria de conversar com você.")}`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm font-semibold text-white hover:underline transition-all mt-0.5"
                  >
                    (19) 97124-2720
                  </a>
                </div>
              </div>

              <div className="flex gap-3 items-start">
                <Mail className="w-5 h-5 text-white/80 shrink-0 mt-0.5" />
                <div className="flex flex-col">
                  <span className="text-[10px] tracking-widest text-white/70 font-bold uppercase">
                    E-mail
                  </span>
                  <a
                    href="mailto:fabrinemarafernandes@gmail.com"
                    className="text-sm font-semibold text-white hover:underline transition-all mt-0.5 break-all"
                  >
                    fabrinemarafernandes@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex gap-3 items-start">
                <MapPin className="w-5 h-5 text-white/80 shrink-0 mt-0.5" />
                <div className="flex flex-col">
                  <span className="text-[10px] tracking-widest text-white/70 font-bold uppercase">
                    Localização
                  </span>
                  <a
                    href="https://maps.app.goo.gl/GMJfQ8NZFyDj3d7Z6?g_st=awb"
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm font-semibold text-white hover:text-brand-gold hover:underline transition-colors mt-0.5"
                  >
                    Rua Belém, 242 - Jd Nossa Senhora de Fátima
                  </a>
                </div>
              </div>
            </div>

          </div>

          {/* Linha Final de Créditos */}
          <div className="border-t border-white/15 pt-8 flex flex-col lg:flex-row justify-between items-center gap-6 text-center lg:text-left text-xs text-white/75 font-sans">
            <p className="max-w-md">
              © {new Date().getFullYear()} Fabrine Fernandes - Clínica & Consultoria Pedagógica. Todos os direitos reservados.
            </p>
            
            {/* Desenvolvido Por Logo */}
            <div className="flex flex-col items-center gap-2 shrink-0">
              <span className="text-[10px] tracking-widest uppercase text-white/70 font-sans font-bold">
                Desenvolvido por
              </span>
              <a
                href="https://www.easybyzcreator.com"
                target="_blank"
                rel="noreferrer"
                className="inline-block hover:opacity-90 transition-opacity active:scale-95 duration-200"
              >
                <img
                  src="https://i.ibb.co/39WMgr3L/l-ebc.png"
                  alt="EBC Logo"
                  className="h-[96px] w-auto object-contain"
                />
              </a>
            </div>

            <p className="flex items-center gap-1.5 shrink-0">
              Desenvolvido com <Heart className="w-3.5 h-3.5 text-white fill-current" /> e Afetividade.
            </p>
          </div>
        </div>
      </footer>

      {/* Botão flutuante de Scroll to Top */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            onClick={scrollToTop}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="fixed bottom-6 right-6 z-40 w-12 h-12 rounded-xl bg-brand-gray text-white hover:bg-brand-gold hover:text-brand-gray flex items-center justify-center shadow-2xl transition-all duration-300 focus-glow cursor-pointer border border-white/10"
          >
            <ArrowUp className="w-5 h-5" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
