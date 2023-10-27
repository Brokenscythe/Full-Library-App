import express from 'express';
import { getReservationsData } from '../controllers/dashBoardController'; 

const router = express.Router();


router.get('/', getReservationsData);

export default router;
