import { GoogleGenAI } from "@google/genai";

const API_KEY = process.env.GEMINI_API_KEY || "";
const ai = new GoogleGenAI({ apiKey: API_KEY });

export async function getExecutiveInsight(context: string) {
  if (!API_KEY) {
    return "The Strategic Intelligence module is currently offline. Please provide an API Key to restore functionality.";
  }

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `
        You are the "Executive AI Advisor" for a top-tier office management system named "ORIPOV Executive Hub".
        The user is Oripov Muhammadali, a world-class leader and visionary.
        
        Context: ${context}
        
        Provide a concise, high-impact strategic insight or piece of wisdom for Muhammadali. 
        The tone should be professional, respectful, sophisticated, and motivating.
        Avoid clichés. Speak like a chief of staff or a strategic consultant.
        Keep it under 60 words.
      `,
    });
    
    return response.text || "Operational excellence achieved. Awaiting further directives.";
  } catch (error) {
    console.error("AI Insight Error:", error);
    return "Unable to generate strategic insight at this moment. Maintaining operational autonomy.";
  }
}
