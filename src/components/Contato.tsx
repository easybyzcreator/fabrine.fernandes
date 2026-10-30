import React, { useState } from "react";
import { Mail, Phone, MapPin, Send, MessageCircle, Sparkles, Heart } from "lucide-react";
import { motion } from "motion/react";
import { saveLead, trackClick } from "../lib/firebase";

export default function Contato() {
  const [formData, setFormData] = useState({
    parentName: "",
    childName: "",
    childAge: "",
    phone: "",
    challenge: "",
    mode: "presencial", // presencial | online
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Salvar dados no Firestore de forma assíncrona
      await saveLead({
        parentName: formData.parentName,
        childName: formData.childName,
        childAge: formData.childAge,
        phone: formData.phone,
        challenge: formData.challenge,
        mode: formData.mode
      });

      // Rastrear o clique
      await trackClick(`Triagem de Atendimento: ${formData.childName}`, "whatsapp");
    } catch (err) {
      console.error("Erro ao salvar triagem no Firebase:", err);
    }
    
    // Criar texto para o WhatsApp estruturado
    const text = `Olá Fabrine! Estava no seu site. Meu nome é *${formData.parentName}*, sou pai/mãe de *${formData.childName}* (${formData.childAge} anos). *Desafio que enfrentamos:* "${formData.challenge}" Gostaria de agendar com você uma conversa inicial ou avaliação para meu filho(a).`;

    const encodedText = encodeURIComponent(text);
    const whatsappUrl = `https://wa.me/5519971242720?text=${encodedText}`;

    // Abrir em nova aba
    window.open(whatsappUrl, "_blank");
    setSubmitted(true);
  };

  return (
    <section id="contato" className="py-24 bg-white relative overflow-hidden">
      {/* Background color blob */}
      <div className="absolute top-1/2 left-1/4 w-80 h-80 bg-brand-yellow/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* Informações de Contato / Texto (lg:col-span-5) */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-gold/10 text-brand-gold text-xs font-semibold uppercase tracking-widest rounded-full mb-6 w-fit">
              <Sparkles className="w-3.5 h-3.5" />
              Triagem de Atendimento
            </div>

            <h2 className="font-serif text-4xl sm:text-5xl font-semibold text-brand-gray mb-6 leading-tight">
              Dê o primeiro passo para <span className="italic text-brand-gold font-light">compreender seu filho</span>
            </h2>

            <p className="font-sans text-brand-gray/70 text-base leading-relaxed mb-8">
              Preencha nossa pré-triagem rápida e me conte um pouco sobre os desafios que vocês enfrentam em casa ou na escola. Você será direcionado para o meu WhatsApp pessoal para combinarmos o melhor dia e horário de consulta.
            </p>

            {/* Vídeo do Cérebro Quebra-Cabeça */}
            <motion.div
              id="brain-puzzle-video-container"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-10 rounded-2xl overflow-hidden border-2 border-brand-gold bg-white p-1 shadow-lg relative aspect-video flex items-center justify-center"
            >
              <img
                id="brain-puzzle-video-gif"
                src="https://lh3.googleusercontent.com/d/1KoYH4qEzkw0GgLscxqQtPmFSLqIz5A0F"
                className="w-full h-full rounded-xl object-contain bg-white"
                alt="Cérebro Quebra-Cabeça"
                referrerPolicy="no-referrer"
              />
            </motion.div>

            {/* Lista de Contatos Físicos */}
            <div className="space-y-6">
              <div className="flex gap-4 items-start">
                <div className="w-11 h-11 rounded-xl bg-brand-blue/10 flex items-center justify-center text-brand-blue shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-serif text-base font-semibold text-brand-gray">Atendimento Presencial</h4>
                  <a
                    href="https://maps.app.goo.gl/GMJfQ8NZFyDj3d7Z6?g_st=awb"
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm text-brand-gray/60 hover:text-brand-gold hover:underline leading-relaxed font-sans block transition-all"
                  >
                    Rua Belém, 242 - Jd Nossa Senhora de Fátima, Americana - SP (Consultório Clínico Acolhedor).
                  </a>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="w-11 h-11 rounded-xl bg-brand-rose/10 flex items-center justify-center text-brand-rose shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-serif text-base font-semibold text-brand-gray">WhatsApp Direto</h4>
                  <p className="text-sm text-brand-gray/60 leading-relaxed font-sans">
                    <a
                      href={`https://wa.me/5519971242720?text=${encodeURIComponent("Olá Fabrine! Estava navegando no seu site e gostaria de conversar com você.")}`}
                      target="_blank"
                      rel="noreferrer"
                      className="text-brand-gray font-semibold hover:text-brand-gold hover:underline transition-colors"
                    >
                      (19) 97124-2720
                    </a>{" "}
                    (Atendimento de Segunda a Sexta, das 9h às 18h).
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="w-11 h-11 rounded-xl bg-brand-green/10 flex items-center justify-center text-brand-green shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-serif text-base font-semibold text-brand-gray">E-mail Profissional</h4>
                  <p className="text-sm text-brand-gray/60 leading-relaxed font-sans">
                    <a href="mailto:fabrinemarafernandes@gmail.com" className="hover:text-brand-gold transition-colors underline">
                      fabrinemarafernandes@gmail.com
                    </a>
                  </p>
                </div>
              </div>
            </div>

            {/* Mensagem de acolhimento extra */}
            <div className="mt-10 p-5 rounded-2xl bg-brand-bg border border-brand-gold/15 flex items-start gap-4">
              <div className="w-9 h-9 rounded-full bg-brand-rose/10 flex items-center justify-center text-brand-rose shrink-0">
                <Heart className="w-4 h-4 fill-brand-rose" />
              </div>
              <p className="text-xs sm:text-sm text-brand-gray/70 leading-relaxed font-sans">
                <strong>Atenção às vagas de atendimento clínico:</strong> Para manter o altíssimo padrão de acolhimento e acompanhamento, atendo um número restrito de famílias no consultório presencial.
              </p>
            </div>

          </div>

          {/* Formulário de Triagem (lg:col-span-7) */}
          <div className="lg:col-span-7 bg-brand-bg rounded-3xl p-6 sm:p-8 md:p-10 border border-brand-gold/10 shadow-2xl focus-glow relative">
            
            <h3 className="font-serif text-2xl font-semibold text-brand-gray mb-1">
              Ficha de Pré-Atendimento
            </h3>
            <p className="text-xs text-brand-gray/50 mb-8 uppercase font-sans tracking-wider">
              Preenchimento rápido e seguro (leva menos de 1 minuto)
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="flex flex-col">
                  <label htmlFor="parentName" className="text-xs font-bold text-brand-gray uppercase tracking-widest mb-2 font-sans">
                    Seu Nome Completo
                  </label>
                  <input
                    type="text"
                    id="parentName"
                    required
                    value={formData.parentName}
                    onChange={(e) => setFormData({ ...formData, parentName: e.target.value })}
                    placeholder="Ex: Maria Oliveira"
                    className="w-full px-4 py-3 bg-white border border-brand-gold/15 rounded-xl font-sans text-sm focus:outline-none focus:ring-2 focus:ring-brand-gold"
                  />
                </div>

                <div className="flex flex-col">
                  <label htmlFor="phone" className="text-xs font-bold text-brand-gray uppercase tracking-widest mb-2 font-sans">
                    WhatsApp para Retorno
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="Ex: (18) 99999-9999"
                    className="w-full px-4 py-3 bg-white border border-brand-gold/15 rounded-xl font-sans text-sm focus:outline-none focus:ring-2 focus:ring-brand-gold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="flex flex-col">
                  <label htmlFor="childName" className="text-xs font-bold text-brand-gray uppercase tracking-widest mb-2 font-sans">
                    Nome do seu Filho(a)
                  </label>
                  <input
                    type="text"
                    id="childName"
                    required
                    value={formData.childName}
                    onChange={(e) => setFormData({ ...formData, childName: e.target.value })}
                    placeholder="Ex: Joãozinho"
                    className="w-full px-4 py-3 bg-white border border-brand-gold/15 rounded-xl font-sans text-sm focus:outline-none focus:ring-2 focus:ring-brand-gold"
                  />
                </div>

                <div className="flex flex-col">
                  <label htmlFor="childAge" className="text-xs font-bold text-brand-gray uppercase tracking-widest mb-2 font-sans">
                    Idade dele(a)
                  </label>
                  <input
                    type="text"
                    id="childAge"
                    required
                    value={formData.childAge}
                    onChange={(e) => setFormData({ ...formData, childAge: e.target.value })}
                    placeholder="Ex: 8"
                    className="w-full px-4 py-3 bg-white border border-brand-gold/15 rounded-xl font-sans text-sm focus:outline-none focus:ring-2 focus:ring-brand-gold"
                  />
                </div>
              </div>

              <div className="flex flex-col">
                <label htmlFor="challenge" className="text-xs font-bold text-brand-gray uppercase tracking-widest mb-2 font-sans">
                  Descreva resumidamente os desafios dele(a)
                </label>
                <textarea
                  id="challenge"
                  required
                  rows={4}
                  value={formData.challenge}
                  onChange={(e) => setFormData({ ...formData, challenge: e.target.value })}
                  placeholder="Ex: Apresenta resistência extrema para fazer as tarefas, desatenção constante na sala de aula, laudo recente de TDAH..."
                  className="w-full px-4 py-3 bg-white border border-brand-gold/15 rounded-xl font-sans text-sm focus:outline-none focus:ring-2 focus:ring-brand-gold resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-gradient-to-r from-brand-gold to-brand-yellow hover:from-brand-gold hover:to-brand-gold text-brand-gray font-bold text-sm uppercase tracking-wider rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 border border-brand-gold/20"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.458 5.706 1.459h.008c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                QUERO AGENDAR UMA AVALIAÇÃO
              </button>

              {submitted && (
                <p className="text-center text-xs text-brand-green font-semibold font-sans mt-3">
                  ✓ Ficha processada! Se a aba não tiver aberto, clique no botão novamente.
                </p>
              )}

            </form>

          </div>

        </div>
      </div>
    </section>
  );
}
