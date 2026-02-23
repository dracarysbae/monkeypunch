import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

async function run() {
  const prompt = `Search the internet for accurate, real information about "Punch", the baby macaque (snow monkey) at Ichikawa City Zoo in Japan.
  Please find:
  1. Exact birth date
  2. Current age
  3. Weight and height (if available)
  4. Any other specific, verified facts about him.
  Return the results in JSON format.`;

  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: prompt,
    config: {
      tools: [{ googleSearch: {} }],
    },
  });

  console.log(response.text);
}

run();
