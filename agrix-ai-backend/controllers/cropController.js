import { GoogleGenerativeAI } from "@google/generative-ai";
import fs from "fs";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const analyzeCrop = async (req, res) => {
  try {
    const imagePath = req.file.path;

    const imageBuffer = fs.readFileSync(imagePath);
    const base64Image = imageBuffer.toString("base64");

    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
    });

    const result = await model.generateContent([
      {
        inlineData: {
          mimeType: "image/jpeg",
          data: base64Image,
        },
      },
      {
        text: `
Analyze this crop image and return:

- Plant health condition
- Disease (if any)
- Confidence %
- Causes
- Treatment
- Prevention

Make it simple for a Kenyan farmer.
        `,
      },
    ]);

    const response = await result.response;

    res.json({
      result: response.text(),
    });

    fs.unlinkSync(imagePath); // delete image after use
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Crop analysis failed" });
  }
};