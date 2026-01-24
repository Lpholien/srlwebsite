import { GoogleGenAI, Type } from "@google/genai";
import { URSResponse } from '../types';

// Initialize Gemini Client Lazily
let aiInstance: GoogleGenAI | null = null;

const getAI = () => {
  const apiKey = process.env.API_KEY || process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("Gemini API Key is not configured. Please set GEMINI_API_KEY in your .env file.");
  }
  if (!aiInstance) {
    aiInstance = new GoogleGenAI({ apiKey });
  }
  return aiInstance;
};

const MODEL_NAME = 'gemini-1.5-flash'; // Updated to a stable model name

const SYSTEM_INSTRUCTION = `
You are a Lead Validation Engineer and Computer System Validation (CSV/CSA) Expert for a Life Sciences consulting firm.
Your task is to generate a professional User Requirement Specification (URS) table based on a user's prompt.
The output must be strictly technical, compliant with GxP/21 CFR Part 11, and formatted as structured data.
Adhere to "Pharma 4.0" principles: Data Integrity, Interoperability, and Automation.
`;

export const generateURS = async (userPrompt: string, systemType: string): Promise<URSResponse> => {
  try {
    const fullPrompt = `
      System Type: ${systemType}
      User Description: ${userPrompt}
      
      Generate a URS containing 5-8 critical requirements.
      Include a brief technical summary of the system architecture.
    `;

    const ai = getAI();
    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: fullPrompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        responseMimeType: "application/json",
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
                  id: { type: Type.STRING, description: "e.g., URS-001" },
                  category: { type: Type.STRING, description: "e.g., Security, Audit Trail, Workflow, Reporting" },
                  requirement: { type: Type.STRING },
                  priority: { type: Type.STRING, enum: ["High", "Medium", "Low"] },
                  rationale: { type: Type.STRING, description: "Why this is needed for GxP compliance or business value" }
                },
                required: ["id", "category", "requirement", "priority", "rationale"]
              }
            }
          },
          required: ["projectName", "items", "summary"]
        }
      }
    });

    const text = response.text;
    if (!text) {
      throw new Error("No response generated");
    }

    return JSON.parse(text) as URSResponse;

  } catch (error) {
    console.error("Error generating URS:", error);
    throw error;
  }
};