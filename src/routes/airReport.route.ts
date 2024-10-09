import { Router } from 'express';
import * as AirReportController from '../controllers/airReport.controller';
import { checkExistingReport } from '../middlewares/existingReport.middleware';
import { rateLimiter } from '../middlewares/rateLimit.middleware';

const airReportRouter = Router();

airReportRouter.get('/', AirReportController.allReport);
airReportRouter.post(
  '/add',
  rateLimiter,
  checkExistingReport,
  AirReportController.createReport,
);
// /aqi?month=oct&year=2024 for monthly report of a year
//  or /aqi?year=2024 for yearly report showing min, max, and avg aqi
airReportRouter.get('/aqi', AirReportController.getAQIReport);

export default airReportRouter;
