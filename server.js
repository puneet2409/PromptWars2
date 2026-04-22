/* global process */
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import helmet from 'helmet';
import cors from 'cors';
import { GoogleGenAI, Type } from '@google/genai';
import 'dotenv/config';

// Import our context data
import { CONSTITUENCIES, LOK_SABHA_2019, VOTING_GUIDE } from './src/constants/electionData.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        connectSrc: ["'self'"],
        scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'"],
        styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
        imgSrc: ["'self'", "data:", "blob:"],
        fontSrc: ["'self'", "data:", "https://fonts.gstatic.com"],
      },
    },
    crossOriginEmbedderPolicy: false,
  })
);

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

app.post('/api/chat', async (req, res) => {
  try {
    const { message, lang } = req.body;
    
    const systemInstruction = `You are Chunav Saathi, an AI assistant for Indian civic education.
    Language to respond in: ${lang === 'hi' ? 'Hindi' : 'English'}.
    Provide facts ONLY based on this election data:
    Constituencies: ${JSON.stringify(CONSTITUENCIES)}
    2019 Results: ${JSON.stringify(LOK_SABHA_2019)}
    Voting Guide: ${JSON.stringify(VOTING_GUIDE)}
    If asked about anything outside this data, politely say you don't have that information.
    Keep answers very concise. Return structured JSON matching the schema exactly.`;

    const responseSchema = {
      type: Type.OBJECT,
      properties: {
        title: {
          type: Type.STRING,
          description: "A short, engaging title for the response",
        },
        text: {
          type: Type.STRING,
          description: "The main concise response text in the requested language",
        },
        actions: {
          type: Type.ARRAY,
          items: { type: Type.STRING },
          description: "An array of 2 to 3 short follow-up questions or actions the user can take next. Keep them short (max 4 words).",
        },
      },
      required: ["title", "text", "actions"],
    };

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: message,
      config: {
        systemInstruction: systemInstruction,
        responseMimeType: "application/json",
        responseSchema: responseSchema,
      }
    });

    const parsedData = JSON.parse(response.text);
    res.json({ ...parsedData, lang });

  } catch (error) {
    console.error("Gemini API Error:", error);
    res.status(500).json({ error: 'Failed to generate response' });
  }
});

// Serve static files from Vite build
app.use(express.static(path.join(__dirname, 'dist')));

// SPA fallback — all routes serve index.html
app.use((req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Chunav Saathi server listening on port ${PORT}`);
});
