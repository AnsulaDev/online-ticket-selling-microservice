import express from 'express';
import{json} from 'body-parser';
import { currntUserRouter } from './routes/current-user';
import { signinRouter } from './routes/signin';
import { signoutrRouter } from './routes/signout';
import { signupRouter } from './routes/signup';

const app = express();

app.use(json());

app.use(currntUserRouter);
app.use(signinRouter);
app.use(signoutrRouter);
app.use(signupRouter);

app.listen(3000, ()=>{
    console.log('Listening on port 3000!!!!')
});
