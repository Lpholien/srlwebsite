import { GoogleGenAI, Type } from '@google/genai';

const MODEL_NAME = 'gemini-1.5-flash';

const SYSTEM_INSTRUCTION = `
You are a Lead Validation Engineer and Computer System Validation (CSV/CSA) Expert for a Life Sciences consulting firm.
Your task is to generate a professional User Requirement Specification (URS) table based on a user's prompt.
The output must be strictly technical, compliant with GxP/21 CFR Part 11, and formatted as structured data.
Adhere to Pharma 4.0 principles: Data Integrity, Interoperability, and Automation.
`;

type RequestBody = {
  userPrompt?: string;
  systemType?: string;
};

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    res.status(405).send('Method not allowed');
    return;
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    res.status(500).send('Server misconfiguration: GEMINI_API_KEY is missing');
    return;
  }

  const body = (req.body || {}) as RequestBody;
  const userPrompt = (body.userPrompt || '').trim();
  const systemType = (body.systemType || '').trim();

  if (!userPrompt || !systemType) {
    res.status(400).send('Missing required fields: userPrompt and systemType');
    return;
  }

  const prompt = `
System Type: ${systemType}
User Description: ${userPrompt}

Generate a URS containing 5-8 critical requirements.
Include a brief technical summary of the system architecture.
`;

  try {
    const ai = new GoogleGenAI({ apiKey });
    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: prompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            projectName: { type: Type.STRING },
            summary: { type: Type.STRING },
            items: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  id: { type: Type.STRING, description: 'e.g., URS-001' },
                  category: { type: Type.STRING, description: 'e.g., Security, Audit Trail, Workflow, Reporting' },
                  requirement: { type: Type.STRING },
                  priority: { type: Type.STRING, enum: ['High', 'Medium', 'Low'] },
                  rationale: { type: Type.STRING, description: 'Why this is needed for GxP compliance or business value' },
                },
                required: ['id', 'category', 'requirement', 'priority', 'rationale'],
              },
            },
          },
          required: ['projectName', 'items', 'summary'],
        },
      },
    });

    const text = response.text;
    if (!text) {
      res.status(502).send('Model returned empty response');
      return;
    }

    res.setHeader('Content-Type', 'application/json');
    res.status(200).send(text);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unexpected error';
    res.status(500).send(message);
  }
}
