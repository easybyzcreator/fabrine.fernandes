export interface Atendimento {
  id: string;
  titulo: string;
  descricao: string;
  publico: string;
  metodologia: string;
  online: boolean;
  presencial: boolean;
  cor: string;
  detalhes: string[];
}

export interface ProdutoSistema {
  id: string;
  titulo: string;
  subtitulo: string;
  descricao: string;
  tipo: 'sistema' | 'produto_fisico' | 'digital';
  imagemPlaceholder: string;
  cor: string;
  beneficios: string[];
  preco: string;
}

export interface Mentoria {
  id: string;
  titulo: string;
  subtitulo: string;
  descricao: string;
  duracao: string;
  cor: string;
  conteudo: string[];
  vagasLimitadas: boolean;
  preco: string;
}

export interface Curso {
  id: string;
  titulo: string;
  subtitulo: string;
  cargaHoraria: string;
  publicoAlvo: string;
  descricao: string;
  cor: string;
  modulos: string[];
  preco: string;
}

export interface Livro {
  id: string;
  titulo: string;
  subtitulo: string;
  descricao: string;
  paginas: number;
  cor: string;
  sinopse: string;
  preco: string;
  destaque: string;
  imagem?: string;
}

export const ATENDIMENTOS: Atendimento[] = [
  {
    id: "tdah",
    titulo: "Apoio e Estratégias de aprendizagem para TDAH",
    descricao: "Intervenção focada em desenvolvimento da aprendizagem com estratégias de regulação atencional, organização de rotinas, controle inibitório e manejo de impulsividade para crianças e adolescentes.",
    publico: "Crianças a partir de 5 anos, adolescentes e orientação a pais.",
    metodologia: "Estimulação das funções executivas através de jogos terapêuticos e reestruturação ambiental.",
    online: false,
    presencial: true,
    cor: "yellow", // #F9DC3F
    detalhes: [
      "Treino de Funções Executivas (Memória de trabalho, Flexibilidade cognitiva)",
      "Adaptação de rotinas em casa e técnicas de estudo eficientes",
      "Manejo de comportamento e acolhimento emocional",
      "Intermediação com a equipe escolar para adequações pedagógicas"
    ]
  },
  {
    id: "autismo",
    titulo: "Intervenção no Transtorno do Espectro Autista (TEA)",
    descricao: "Desenvolvimento de habilidades cognitivas e/ou acadêmicas, favorecimento da aprendizagem e da autonomia, respeitando a singularidade e hiperfocos de cada um.",
    publico: "Crianças em fase de desenvolvimento e transição escolar.",
    metodologia: "Abordagem baseada na neuropsicopedagogia e intervenções baseadas em evidências.",
    online: false,
    presencial: true,
    cor: "blue", // #68C9EA
    detalhes: [
      "Estímulo às habilidades de vida prática para o ambiente escolar, processo de alfabetização, leitura, escrita, compreensão textual de acordo com as potencialidades do aprendiz.",
      "Orientação (através de documento escrito) para as adaptações curriculares e facilitação da aprendizagem acadêmica",
      "Estímulo das habilidades motoras relacionadas ao ambiente acadêmico (manuseio de objetos de uso escolar, percepção de espaço de folhas e materiais de registro, movimento de preensão de lápis/ canetas, etc.)",
      "Orientação parental estruturada em seções específicas para este fim após um período de sessões com a criança ou conforme a necessidade de cada caso."
    ]
  },
  {
    id: "dificuldades",
    titulo: "Dificuldades Gerais de Aprendizagem",
    descricao: "Avaliação e intervenção para identificar por que a criança apresenta barreiras no aprendizado, resgatando o prazer em aprender.",
    publico: "Crianças até 12 anos.",
    metodologia: "Investigação das dificuldades através da Avaliação Especializada e Intervenção para a superação de habilidades que possam estar em prejuízo no processo de aprendizagem escolar.",
    online: false,
    presencial: true,
    cor: "green", // #56C45F
    detalhes: [
      "Identificação de defasagens pedagógicas básicas (matemática, leitura, escrita)",
      "Exercícios personalizados de ginástica cerebral e foco",
      "Ensino de técnicas de estudo adaptadas ao perfil de aprendizagem",
      "Fortalecimento do vínculo afetivo com o próprio processo de aprender"
    ]
  }
];

export const PRODUTOS: ProdutoSistema[] = [
  {
    id: "funcao-executiva",
    titulo: "Para função executiva",
    subtitulo: "TDAH — planejamento, iniciação, memória de trabalho",
    descricao: "Recursos práticos para apoiar o planejamento diário, reduzir a sobrecarga que trava o início das tarefas e estimular a percepção do tempo.",
    tipo: "digital",
    imagemPlaceholder: "",
    cor: "blue",
    beneficios: [
      'Sistema de "menu de 2 escolhas" — em vez de perguntar "o que você quer fazer agora", oferecer sempre 2 opções concretas e pré-aprovadas por vocês responsáveis. Isso reduz a sobrecarga decisória que trava a iniciação de tarefas e evita comportamentos desnecessários.',
      'Cronômetro de "tempo restante visível" associado a consequência natural, não a punição — ex: "quando o ponteiro chegar aqui, você precisa se preparar para desligar tudo, colocar pijama, apagar a luz do quarto e deitar para dormir" . Evite usar : "se não obedecer, vai perder o tablet", pois isso pode até gerar resultado, mas não gera a percepção de aprendizado e disciplina. Pense assim:é melhor trabalhar a percepção de tempo (que pode estar prejudicada em quem apresenta TDAH), do que uma mera obediência desgastante e sem a real percepção de tempo e necessidade de cumprir combinados.',
      'Checklist com foto real da própria criança executando tarefas cotidianas como por exemplo: arrumando a cama, guardando os brinquedos, etc. Isso traz maior reconhecimento e percepção de valorização de si próprio ao inves de apenas ser um ícone genérico da internet.'
    ],
    preco: ""
  },
  {
    id: "autorregulacao",
    titulo: "Para autorregulação e comunicação",
    subtitulo: "Autismo — antecipação, sobrecarga sensorial",
    descricao: "Estratégias focadas em antecipar rotinas de forma gentil, reduzir a ruptura brusca de atividades e auxiliar na regulação emocional.",
    tipo: "produto_fisico",
    imagemPlaceholder: "",
    cor: "gold",
    beneficios: [
      'Momento de transição com aviso duplo: aviso 5 minutos antes + aviso físico (objeto de transição, tipo levar o brinquedo da atividade seguinte na mão) — não é só "avisar antes", é dar um objeto-ponte que reduz a ruptura rápida.',
      'Termômetro de emoções: ajude a criança a perceber e nomear ou apontar para uma imagem da emoção que está sentindo e a realizar uma respiração guiada (inspiração profunda e expiração lenta) para se acalmar, seguido de um abraço antes de continuar qualquer atividade (pode ser usada como estratégia para momentos em que já existe uma agitação mas ainda NÃO foi instalada a crise, pois na crise outras estratégias podem ter resultados melhores).'
    ],
    preco: ""
  }
];

export const MENTORIAS: Mentoria[] = [
  {
    id: "mentoria-conexao",
    titulo: "Conexão Atípica",
    subtitulo: "Mentoria Individual de Orientação Parental",
    descricao: "Acompanhamento próximo de 4 semanas diretamente com a Fabrine para acolher, orientar e criar um plano de ação personalizado para a rotina do seu filho em casa.",
    duracao: "4 Semanas (4 encontros ao vivo + suporte diário no WhatsApp)",
    cor: "rose",
    conteudo: [
      "Análise aprofundada da dinâmica familiar e perfil sensorial/comportamental da criança",
      "Desenho de rotinas neuroprotetoras sob medida para TDAH, Autismo ou Dislexia",
      "Técnicas de comunicação não-violenta para conter comportamentos desafiadores",
      "Construção de uma rede de apoio sólida e mediação com a escola"
    ],
    vagasLimitadas: true,
    preco: "R$ 497,00"
  },
  {
    id: "mentoria-pro",
    titulo: "NeuroPrática Escolar",
    subtitulo: "Mentoria de Adaptação para Professores e Escolas",
    descricao: "Capacitação prática para educadores aprenderem a criar planos de ensino individualizados (PEI) de verdade, tornando a sala de aula verdadeiramente inclusiva.",
    duracao: "3 Encontros em grupo + Modelos de documentos adaptados",
    cor: "green",
    conteudo: [
      "Como ler e interpretar laudos clínicos de TDAH, Dislexia e Autismo",
      "Estratégias de diferenciação curricular sem perda de conteúdo",
      "Manejo de comportamentos atípicos e crises em sala de aula",
      "Criação e preenchimento prático do Plano de Desenvolvimento Individualizado (PDI)"
    ],
    vagasLimitadas: false,
    preco: "R$ 297,00"
  }
];

export const CURSOS: Curso[] = [
  {
    id: "curso-descomplicando",
    titulo: "Descomplicando o TDAH na Infância",
    subtitulo: "O guia prático definitivo para pais e professores",
    cargaHoraria: "20 horas (Aulas gravadas + Material de apoio em PDF)",
    publicoAlvo: "Pais, familiares, professores de educação infantil e fundamental.",
    descricao: "Aprenda a ciência por trás do cérebro com TDAH, entenda a raiz dos comportamentos desafiadores e aplique mais de 30 estratégias práticas de organização, estudo e calmaria.",
    cor: "yellow",
    modulos: [
      "Módulo 1: O cérebro do TDAH - O que acontece de verdade?",
      "Módulo 2: O tripé do sucesso (Casa - Escola - Terapia)",
      "Módulo 3: Rotinas estruturadas que funcionam sem brigas",
      "Módulo 4: Estratégias pedagógicas e de foco para o dever de casa",
      "Módulo 5: Regulação emocional e blindagem da autoestima do seu filho"
    ],
    preco: "R$ 197,00"
  },
  {
    id: "curso-dislexia-pratica",
    titulo: "Alfabetização e Dislexia na Prática",
    subtitulo: "Como guiar o aprendizado da leitura e escrita com segurança",
    cargaHoraria: "15 horas de conteúdo gravado + Caderno de Atividades Fonológicas",
    publicoAlvo: "Professores, alfabetizadores, pais e psicopedagogos.",
    descricao: "Estratégias multissensoriais passo a passo para alfabetizar crianças com Dislexia ou atrasos severos na leitura, desenvolvendo autoconfiança e autonomia de escrita.",
    cor: "blue",
    modulos: [
      "Módulo 1: Consciência Fonológica como base de tudo",
      "Módulo 2: O método fônico multissensorial na prática diária",
      "Módulo 3: Superando os erros de troca de letras e espelhamento",
      "Módulo 4: Caderno de atividades práticas prontas para imprimir",
      "Módulo 5: Como avaliar e acompanhar a evolução da fluência leitora"
    ],
    preco: "R$ 179,00"
  }
];

export const LIVROS: Livro[] = [
  {
    id: "ebook-autismo-sera",
    titulo: "Será que meu filho é autista?",
    subtitulo: "O que observar e como agir diante da dúvida",
    descricao: "Este e-book traz informações importantes sobre as características do Transtorno do Espectro do Autismo (TEA) com linguagem simples e acessível. Se você tem filhos e percebe que seu desenvolvimento ocorre de forma diferenciada mas ainda fica em dúvida sobre questões relacionadas ao TEA (Autismo), este e-book é para você!",
    paginas: 48,
    cor: "blue",
    sinopse: "Se você é um profissional da educação e deseja conhecer um pouco sobre o Autismo, este e-book é indicado para você iniciar esta trajetória de forma acolhedora, baseada em evidências, com linguagem simples e acessível.",
    preco: "R$ 27,90",
    destaque: "E-BOOK",
    imagem: "https://i.ibb.co/5gTL9Sj8/capa-autismo-fabrine.png"
  },
  {
    id: "ebook-comportamentos-desafiadores",
    titulo: "Comportamentos Desafiadores",
    subtitulo: "Transformando Crises em Conexão",
    descricao: "Um guia prático com embasamento científico para mães e educadores. Você já passou por um momento em que a criança simplesmente travou — gritando no meio do supermercado ou recusando-se terminantemente a realizar uma atividade em sala de aula? Se sim, saiba que você não está sozinha.",
    paginas: 65,
    cor: "gold",
    sinopse: "Essa é a realidade de milhares de mães e educadores todos os dias. Comportamentos desafiadores geram preocupação, cansaço emocional e culpa. Compreenda de uma vez: 'Comportamentos desafiadores são, na maioria das vezes, uma forma de comunicação — não desobediência intencional.' Criado para te ajudar a identificar as fases da crise e agir com assertividade e empatia. Pilares: CIÊNCIA • EMPATIA • PRÁTICA • CONEXÃO.",
    preco: "R$ 37,00",
    destaque: "E-BOOK",
    imagem: "https://i.ibb.co/GffSKzbV/capa-desafiadores.png"
  },
  {
    id: "ebook-maternidade-consciente",
    titulo: "Maternidade Consciente",
    subtitulo: "Desafios, Reflexões e Conexão Real",
    descricao: "Como mãe, eu sei o quanto dói sentir que a gente fala, fala… e parece que não consegue mais alcançar o coração dos nossos filhos. E como profissional, eu também sei que comportamento não é só ‘birra’, ‘desobediência’ ou ‘falta de limites’.",
    paginas: 50,
    cor: "rose",
    sinopse: "Muitas vezes, é emoção acumulada que a criança ainda não sabe expressar. Por isso, trouxe neste e-book uma forma de compreender melhor como conduzir uma maternidade consciente e refletir sobre pontos importantes dos desafios da maternidade.",
    preco: "R$ 14,90",
    destaque: "E-BOOK",
    imagem: "https://i.ibb.co/nM86S1Dt/l-guia.png"
  }
];
