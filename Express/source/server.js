// Core
import express from 'express';
//Routers
import * as routers from './routers';
//Utils
import { logger } from './utils';
//Parser
// import bodyParser from 'body-parser';
// app.use(bodyParser.json({ limit: '10kb' }));

const app = express();

app.use(express.json());

app.use((req, res, next) => {
  try {
    if (process.env.NODE_ENV !== 'production') {
      const log = {
        level: 'debug',
        method: req.method,
        url: req.originalUrl,
        payload: req.body,
      }

      logger.log(log);
    }

    next();
  } catch (error) {
    throw new Error('Да хуй знает чёт с логгером');
  }
});

app.use('/users', routers.users);
app.use('/classes', routers.classes);
app.use('/lessons', routers.lessons);
app.use('/auth', routers.auth);

export { app };
