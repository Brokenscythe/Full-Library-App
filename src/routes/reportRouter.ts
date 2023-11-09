import express from "express";
import { generateDailyReport } from "../controllers/reportController";

const router = express.Router();


router.get("/dailyReport", generateDailyReport);

export default router;
