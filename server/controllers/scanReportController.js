import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI("AIzaSyBU9QEqvUIHsoL2qrbpZ1f0G5wO7R6kh6Y");

export const scanReport = async (req, res) => {
  try {
    const { base64Image } = req.body;

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `
      Analyze this medical report image and return JSON with:
      patientName, age, gender, diseaseOrCondition, symptoms, reportDetails
    `;

    const result = await model.generateContent([
      { inlineData: { data: base64Image, mimeType: "image/png" } },
      prompt,
    ]);

    const text = (await result.response).text();
    const cleanedText = text.replace(/```(?:json)?\n?/g, "").trim();
    const data = JSON.parse(cleanedText);

    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to scan report" });
  }
};
