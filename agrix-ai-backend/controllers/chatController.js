import { GoogleGenAI } from "@google/genai";

export const handleChat = async (req, res) => {
  try {
    const { message } = req.body;

    const ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
    });

    const result = await ai.models.generateContent({
      model: "gemini-1.5-pro-002",
      contents: `
You are a Kenyan agricultural assistant.
Respond in Kiswahili or English depending on user.

User: ${message}
      `,
    });

    res.json({
      reply: result.text,
    });

  } catch (error) {
    console.error("ERROR:", error);
    res.status(500).json({
      error: "Chat failed",
      details: error.message,
    });
  }
};