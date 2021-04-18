// Core
import express from 'express';

//parses
import bodyParser from 'body-parser';

//Routers
import * as routers from './routers';

const app = express();
app.use(express.json());

app.use(bodyParser.json({ limit: '10kb' }));

app.use('/users', routers.users);
app.use('/classes', routers.classes);
app.use('/lessons', routers.lessons);
app.use('/auth', routers.auth);

export { app };
