import { Router } from 'express';
import airReportRouter from './airReport.route';

const router = Router();
router.use('/reports', airReportRouter);

export default router;
