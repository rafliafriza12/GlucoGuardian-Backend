import express from "express";
import { diagnoseDiabetes, getLatestDiagnosis } from "../controllers/userGlucoseController.js"

const router = express.Router();

// Route untuk mendapatkan diagnosis terbaru
router.get("/latest-diagnosis", getLatestDiagnosis);

// Route untuk diagnosa diabetes
router.post("/diagnose", diagnoseDiabetes);

export default router;