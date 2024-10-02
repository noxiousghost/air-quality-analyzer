import app from './configs/express.config';
import { envVars } from './configs/envVars.config';
import logger from './configs/logger.config';
import routes from './routes/index.route';

const port = envVars.PORT;
app.use('/api', routes);

app.listen(port, () => {
  logger.info(`App listening on port ${port}`);
});
