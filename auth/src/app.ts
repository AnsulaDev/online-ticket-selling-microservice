import express from 'express';
import 'express-async-errors';
import{json} from 'body-parser';
import cookieSession from 'cookie-session';

import { currntUserRouter } from './routes/current-user';
import { signinRouter } from './routes/signin';
import { signoutrRouter } from './routes/signout';
import { signupRouter } from './routes/signup';
import { errorHandler } from './middleware/error-handler';
import { NotFoundError } from './errors/not-found-errors';


const app = express();
app.set('trust proxy', true);
app.use(json());

app.use(
    cookieSession({
        signed: false,
        secure: true  //it must be on https connection
    })
);

app.use(currntUserRouter);
app.use(signinRouter);
app.use(signoutrRouter);
app.use(signupRouter);

app.all('*', async() =>{
    throw new NotFoundError()
});

app.use(errorHandler);



export {app};