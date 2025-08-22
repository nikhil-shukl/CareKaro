
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI("AIzaSyBU9QEqvUIHsoL2qrbpZ1f0G5wO7R6kh6Y");

export const scanReport = async (req, res) => {
  try {
    const { base64Image } = req.body;

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `
      Analyze this medical report image and summarize it in a clear paragraph.
      Mention the patient's name, age, gender, condition, and main details in human-readable form.
      Do not return JSON, just a natural descriptive text.
    `;

    const result = await model.generateContent([
      { inlineData: { data: base64Image, mimeType: "image/png" } },
      prompt,
    ]);

    const text = (await result.response).text();
    const cleanedText = text.replace(/```/g, "").trim();

    res.json({ description: cleanedText });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to scan report" });
  }
};
