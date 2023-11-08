// routes/statisticsRoutes.ts
import express from 'express';
import { getTotalRentedBooks, getRentedBooksByBookId, getAvailableBooksByBookId, getReservedBooksByBookId , getAllStatistics} from '../controllers/statisticsController';

const statisticsRouter = express.Router();

statisticsRouter.get('/totalRentedBooks', getTotalRentedBooks);
statisticsRouter.get('/rentedBooksByBookId/:bookId', getRentedBooksByBookId);
statisticsRouter.get('/availableBooksByBookId/:bookId', getAvailableBooksByBookId);
statisticsRouter.get('/reservedBooksByBookId/:bookId', getReservedBooksByBookId);

statisticsRouter.get('/allStatistics', getAllStatistics);

export default statisticsRouter;
