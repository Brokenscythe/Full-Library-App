import express from "express";
import { generateDailyReport } from '../controllers/report-controllers/reportController';

const router = express.Router();


router.get("/dailyReport", generateDailyReport);

export default router;
