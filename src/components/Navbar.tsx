import { useState, useEffect } from "react";
import { Menu, X, Brain, Calendar, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menuItems = [
    { name: "Sobre", href: "#sobre" },
    { name: "Atendimentos", href: "#atendimentos" },
    { name: "Metodologia", href: "#metodologia" },
    { name: "Cursos e Capacitações", href: "#mentorias-cursos" },
    { name: "M.A.P.A. Inclusão", href: "#mapa-acolhimento" },
  ];

  return (
    <>
      <motion.nav
        id="navbar"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-brand-bg/95 backdrop-blur-md border-b border-brand-gold/10 shadow-sm py-3"
            : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            {/* Logo area */}
            <a href="#" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-full overflow-hidden shadow-sm flex items-center justify-center bg-white border border-brand-gold/10 group-hover:scale-105 transition-transform duration-300">
                <img
                  src="https://raw.githubusercontent.com/easybyzcreator/imagens/17563760155e9adfc5a58f5f85a53a7de6c2d3c8/ffbb.png"
                  alt="Logo Fabrine Fernandes"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-xl sm:text-2xl font-bold tracking-wide text-brand-gray group-hover:text-brand-gold transition-colors duration-300">
                  Fabrine Fernandes
                </span>
                <span className="text-[9px] sm:text-[10px] tracking-[0.2em] uppercase text-brand-gray/60 font-sans">
                  Neuropsicopedagoga
                </span>
              </div>
            </a>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              {menuItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="font-sans text-sm font-medium text-brand-gray/80 hover:text-brand-gold transition-colors duration-300 relative py-1 group"
                >
                  {item.name}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-brand-gold transition-all duration-300 group-hover:w-full" />
                </a>
              ))}
            </div>

            {/* Desktop CTA */}
            <div className="hidden lg:flex items-center gap-4">
              <a
                href="#contato"
                className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-brand-gold to-brand-yellow hover:from-brand-gold hover:to-brand-gold text-brand-gray font-semibold text-sm rounded-full shadow-md hover:shadow-lg hover:scale-[1.02] transition-all duration-300 border border-brand-gold/20"
              >
                <Calendar className="w-4 h-4" />
                Agendar Avaliação
              </a>
            </div>

            {/* Mobile menu button */}
            <div className="lg:hidden flex items-center gap-3">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-full text-brand-gray hover:bg-brand-gold/10 transition-colors"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed top-[64px] left-0 right-0 z-40 bg-brand-bg border-b border-brand-gold/10 shadow-lg lg:hidden overflow-hidden"
          >
            <div className="px-4 pt-4 pb-6 space-y-3">
              {menuItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-4 py-2 rounded-xl text-base font-medium text-brand-gray/90 hover:bg-brand-gold/10 hover:text-brand-gold transition-all duration-200"
                >
                  {item.name}
                </a>
              ))}
              <div className="pt-4 flex flex-col gap-3 px-4">
                <a
                  href="#contato"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-center gap-2 w-full py-3 bg-gradient-to-r from-brand-gold to-brand-yellow text-brand-gray font-semibold rounded-xl text-sm shadow-md"
                >
                  <Calendar className="w-4 h-4" />
                  Agendar Avaliação
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
