import express from 'express';
import{json} from 'body-parser';
import { currntUserRouter } from './routes/current-user';
import { signinRouter } from './routes/signin';
import { signoutrRouter } from './routes/signout';
import { signupRouter } from './routes/signup';
import { errorHandler } from './middleware/error-handler';
import { NotFoundError } from './errors/not-found-errors';

const app = express();

app.use(json());

app.use(currntUserRouter);
app.use(signinRouter);
app.use(signoutrRouter);
app.use(signupRouter);

app.all('*', () =>{
    throw new NotFoundError()
});

app.use(errorHandler);

app.listen(3000, ()=>{
    console.log('Listening on port 3000!!!!')
});
