import express, { Express } from 'express';
import cors from 'cors';
import { envVars } from './envVars.config';
import path from 'path';

const app: Express = express();
app.disable('x-powered-by');

const corsOptions = {
  origin: [envVars.Access_Control_Allow_Origin_URL as string],
};
app.use(express.static(path.join(__dirname, '..', '..', 'public')));
app.use(cors(corsOptions));
app.use(express.json());

export default app;
