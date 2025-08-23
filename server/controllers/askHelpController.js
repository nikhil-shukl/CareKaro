import AskHelp from "../models/AskHelp.js";

// Create a new AskHelp entry
export const createAskHelp = async (req, res) => {
  try {
    const { title, description, type, fullName, location, contact } = req.body;

    const newEntry = new AskHelp({ title, description, type, fullName, location, contact });
    await newEntry.save();

    res.status(201).json({ success: true, data: newEntry });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// Optional: Get all AskHelp entries
export const getAskHelps = async (req, res) => {
  try {
    const entries = await AskHelp.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: entries });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
