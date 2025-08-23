import express from "express";
import { createAskHelp, getAskHelps } from "../controllers/askHelpController.js";

const router = express.Router();

router.post("/", createAskHelp);
router.get("/", getAskHelps);

export default router;
