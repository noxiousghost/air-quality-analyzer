import app from './configs/express.config';
import { envVars } from './configs/envVars.config';
import logger from './configs/logger.config';
import routes from './routes/index.route';
import morganMiddleware from './middlewares/morgan.middleware';
import { errorHandler } from './middlewares/errorHandler.middleware';
import { unknownEndpoint } from './middlewares/unknownEndpoints.middleware';
import DbConnection from './configs/db.config';

const port = envVars.PORT;
DbConnection();
app.use(morganMiddleware()); //for logging http requests
app.use('/api', routes);
// if a particular endpoint is not found in above route then this middleware throws error
app.use(unknownEndpoint);
app.use(errorHandler);

app.listen(port, () => {
  logger.info(`App listening on port ${port}`);
});
