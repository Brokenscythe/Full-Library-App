import express from 'express';
import { getReservationsData,getAllActivities } from '../controllers/dashboard-controllers/dashBoardController'; 

const router = express.Router();


router.get('/', getReservationsData);
router.get('/activities-all', getAllActivities);




export default router;
