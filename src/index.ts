import app from './configs/express.config';
import { envVars } from './configs/envVars.config';
import routes from './routes/index.route';

const port = envVars.PORT;
app.use('/api', routes);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
