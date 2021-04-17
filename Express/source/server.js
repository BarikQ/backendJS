// Core
import express from 'express';

//Routers
import * as routers from './routers';

const app = express();

app.use('/users', routers.users);

export { app };
