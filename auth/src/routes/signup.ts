import express, { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import { RequestValidationError } from '../errors/request-validation-error';
import { User } from '../models/user';
import { BadRequestError } from '../errors/bad-request-error';

const router = express.Router();

router.post('/api/users/signup',[
    body('email')
        .isEmail()
        .withMessage('Email must be valid'),
    body('password')
        .trim()
        .isLength({min:4, max:20})
        .withMessage('Password must be between 4 and 20 characters')
], async (req:Request, res:Response) => {
    const errors = validationResult(req);//It checks if there are any validation errors based on the validation rules defined for the request.
    
    if(!errors.isEmpty()){ //This line checks if the errors object is not empty, indicating that there are validation errors.
        throw new RequestValidationError(errors.array());
    }
    
    const {email, password} =req.body;
    const existingUser = await User.findOne({ email});
    if( existingUser ){
    /*  console.log('Email is already used');
        return res.send({}); */
        throw new BadRequestError('Email is alread used');
    }
    const user = User.build({email, password});
    await user.save();
    res.status(201).send(user);
});

export { router as signupRouter };
