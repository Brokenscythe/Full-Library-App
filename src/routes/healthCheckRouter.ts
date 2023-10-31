import express from 'express';
import { getHealthCheck,restartServer } from '../controllers/healthCheckController';

const healthCheckRouter = express.Router();

healthCheckRouter.get('/', getHealthCheck);
healthCheckRouter.post('/restart-server', restartServer);

export default healthCheckRouter;
