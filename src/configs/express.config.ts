import express, { Express } from 'express';
import cors from 'cors';
import { envVars } from './envVars.config';
import morganMiddleware from '../middlewares/morgan.middleware';
import { errorHandler } from '../middlewares/errorHandler.middleware';

const app: Express = express();
app.disable('x-powered-by');

const corsOptions = {
  origin: [envVars.Access_Control_Allow_Origin_URL as string],
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(errorHandler);
app.use(morganMiddleware()); //for logging http requests

export default app;
