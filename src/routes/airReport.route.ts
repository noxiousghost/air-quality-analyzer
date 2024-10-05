import { Router } from 'express';
import * as AirReportController from '../controllers/airReport.controller';

const airReportRouter = Router();

airReportRouter.get('/', AirReportController.allReport);
airReportRouter.post('/add', AirReportController.createReport);
airReportRouter.get('/report', AirReportController.getMonthlyReport); // /report?month=oct&year=2024

export default airReportRouter;
