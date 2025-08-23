import mongoose from "mongoose";

const AskHelpSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    type: { type: String, required: true }, // Emergency, Request, etc.
    fullName: { type: String, required: true },
    location: { type: String, required: true },
    contact: { type: String, required: true },
  },
  { timestamps: true }
);

const AskHelp = mongoose.model("AskHelp", AskHelpSchema);
export default AskHelp;
