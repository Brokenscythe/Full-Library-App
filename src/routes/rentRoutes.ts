import { Router } from 'express';
import * as RentController from '../controllers/rentController';

const router = Router();

router.get('/', RentController.getAllRents);
router.get('/:id', RentController.getRent);
router.post('/', RentController.newRent);
router.post('/:id', RentController.updateRent);
router.delete('/:id', RentController.deleteRent);

export default router;
