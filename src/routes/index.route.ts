import { Router } from 'express';
import airRouter from './air.route';

const router = Router();
router.use('/air', airRouter);

export default router;
