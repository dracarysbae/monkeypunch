import express, { Request, Response } from 'express';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
import path from 'path';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(express.json());

// CORS middleware
app.use((req: Request, res: Response, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  
  next();
});

// Health check endpoint for uptime monitoring
app.get('/api/health', (req: Request, res: Response) => {
  res.json({ status: 'okay', timestamp: new Date().toISOString() });
});

// API endpoint for generating report
app.post('/api/generate-report', async (req: Request, res: Response) => {
  try {
    const { prompt, tools } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    
    if (!apiKey) {
      console.error('GEMINI_API_KEY is not set in environment variables');
      return res.status(500).json({ error: 'API Key not configured on server' });
    }

    const ai = new GoogleGenAI({ apiKey });

    const response = await ai.models.generateContent({
      model: 'gemini-2-flash-preview',
      contents: prompt,
      config: {
        tools: tools || [{ googleSearch: {} }],
      },
    });

    const text = response.text || '';
    const sources = response.sources || [];

    res.json({
      text,
      sources,
      success: true,
    });
  } catch (error: any) {
    console.error('Error generating report:', error);
    res.status(500).json({
      error: 'Failed to generate report',
      message: error.message || 'Unknown error',
    });
  }
});

// Serve static files from dist
// __dirname does not exist in ES module scope, so compute it manually.
const __filename = new URL('', import.meta.url).pathname;
const __dirname = path.dirname(__filename);
const distPath = path.join(__dirname, 'dist');
app.use(express.static(distPath));

// catch any unmatched `/api` requests and return JSON so the client
// doesn't try to parse an HTML error page.
app.use('/api', (req: Request, res: Response) => {
  console.warn(`API route not found: ${req.method} ${req.originalUrl}`);
  res.status(404).json({ error: 'Not found' });
});

// Fallback to index.html for React Router
app.get('*', (req: Request, res: Response) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`API Key configured: ${process.env.GEMINI_API_KEY ? 'Yes' : 'No'}`);
});
