import express from 'express';
import 'express-async-errors';
import{json} from 'body-parser';
import mongoose, { mongo } from 'mongoose';
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

app.all('*', async() =>{
    throw new NotFoundError()
});

app.use(errorHandler);

const start = async () =>{
    try{
        await mongoose.connect('mongodb://auth-mongo-srv:27017/auth');
        console.log('Connected to mongodb')
    }
    catch(err){
        console.log(err);
    }

    app.listen(3000, ()=>{
        console.log('Listening on port 3000!!!!')
    });
    

};

start();

