import { Router } from 'express';
import airReportRouter from './airReport.route';
import uploadFileRouter from './uploadFile.route';

const router = Router();
router.use('/report', airReportRouter);
router.use('/file', uploadFileRouter);

export default router;
