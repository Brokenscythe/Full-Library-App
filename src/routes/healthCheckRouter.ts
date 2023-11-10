import express from 'express';
import { getHealthCheck,restartServer } from '../controllers/healthCheck-controllers/healthCheckController';
// import { getHealthCheck, restartServer, backupDatabase } from '../controllers/healthCheck-controllers/healthCheckController';


const healthCheckRouter = express.Router();

healthCheckRouter.get('/', getHealthCheck);
healthCheckRouter.post('/restart-server', restartServer);
// healthCheckRouter.get('/backup-database', backupDatabase);

export default healthCheckRouter;

//kodza bekap baze podataka
