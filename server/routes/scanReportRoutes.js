import express from "express";
import { scanReport } from "../controllers/scanReportController.js";

const router = express.Router();

router.post("/", scanReport);

export default router;
