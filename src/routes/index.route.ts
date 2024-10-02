import { test } from '../controllers/test.controller';
import { Router } from 'express';

const router = Router();
router.use('/', test);

export default router;
