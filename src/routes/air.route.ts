import { Router } from 'express';
import * as AirController from '../controllers/air.controller';

const airRouter = Router();

airRouter.get('/', AirController.allReport);
airRouter.post('/', AirController.createReport);

export default airRouter;
