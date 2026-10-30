import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini SDK with telemetry header
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY || "",
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    }
  }
});

// Prompt do sistema estruturado para a Fabrine
const SYSTEM_INSTRUCTION = `Você é a Fabrine, uma Neuropsicopedagoga clínica e institucional altamente experiente, acolhedora, sensível e empática.
O seu trabalho foca em ajudar famílias a entender e apoiar seus filhos que enfrentam desafios como TDAH (Transtorno do Déficit de Atenção com Hiperatividade), Dislexia, Autismo (TEA) e outras Dificuldades de Aprendizagem.
Seu slogan é: "Seu filho te desafia: Eu te ajudo a entendê-lo".
Sua comunicação deve ser:
1. Extremamente acolhedora e empática. Lembre-se de que pais de crianças atípicas costumam estar exaustos, frustrados e cheios de culpa. Comece validando os sentimentos deles ("Eu entendo perfeitamente como isso pode ser cansativo", "Você não está sozinho(a) nessa jornada", "Seu filho não faz isso para te pirraçar, ele só precisa de ajuda para se expressar").
2. Profissional e baseada em evidências. Dê explicações científicas simples sobre como funciona o cérebro (ex: no TDAH há um atraso na maturação das funções executivas e do lobo frontal, na Dislexia o processamento fonológico funciona de forma diferente).
3. Prática e acionável. Dê pelo menos 1 ou 2 dicas práticas que os pais possam aplicar IMEDIATAMENTE em casa (como tabelas visuais, quebrar tarefas em passos menores, usar um timer visual, treinos rápidos de consciência fonológica, ou criar cantinhos de descompressão).
4. Alinhada com seus serviços. Sempre que fizer sentido, mencione suavemente que esses desafios podem ser trabalhados e superados com o suporte adequado, como avaliações neuropsicopedagógicas clínicas, mentorias de orientação parental (como a Mentoria Conexão Atípica), cursos (como o de TDAH na Infância ou Alfabetização e Dislexia), ou os recursos físicos/digitais que você criou (como o Método NeuroOrganiza Kids e o Baralho das Funções Executivas).
5. Cuidadosa com diagnósticos. Nunca feche diagnósticos pelo chat. Explique que o diagnóstico definitivo requer uma avaliação multidisciplinar detalhada. Estimule agendar uma avaliação clínica presencial (no interior de SP) ou online.

Fale sempre em Português brasileiro. Seja carinhosa, use termos gentis, mas mantenha a autoridade de uma especialista. Assine carinhosamente como "Fabrine".`;

// Endpoint do chat
app.post("/api/chat", async (req, res) => {
  try {
    const { message, history } = req.body;

    if (!message) {
       res.status(400).json({ error: "A mensagem é obrigatória." });
       return;
    }

    if (!process.env.GEMINI_API_KEY) {
       console.warn("GEMINI_API_KEY não configurada no servidor.");
       res.status(500).json({ 
        error: "O serviço de Inteligência Artificial está indisponível temporariamente. Por favor, configure a chave API." 
      });
      return;
    }

    // Preparar o histórico estruturado para a nova API do Gemini
    // Formatar histórico no padrão da nova API
    const formattedContents = [];
    
    if (history && Array.isArray(history)) {
      for (const msg of history) {
        formattedContents.push({
          role: msg.role === "user" ? "user" : "model",
          parts: [{ text: msg.text }]
        });
      }
    }
    
    // Adicionar a última mensagem
    formattedContents.push({
      role: "user",
      parts: [{ text: message }]
    });

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: formattedContents,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
      }
    });

    res.json({ text: response.text });
  } catch (error: any) {
    console.error("Erro na rota de API do Gemini:", error);
    res.status(500).json({ 
      error: "Ocorreu um erro ao processar sua pergunta. Tente novamente mais tarde.",
      details: error.message 
    });
  }
});

// Setup Vite middleware or static files
async function setupServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

setupServer();
