import { Router } from 'express';
import * as AirReportController from '../controllers/airReport.controller';

const airReportRouter = Router();

airReportRouter.get('/', AirReportController.allReport);
airReportRouter.post('/add', AirReportController.createReport);

export default airReportRouter;
