
// to manages routes or paths to product controller 

// 1 import express 
import express from 'express';
import { UserController } from './user.controller.js';

// initialize router 
const userRouter = express.Router();

const userController = new UserController;

// all the paths to controller methods.

// localhost:3200/api/products/filter?minPrice=10&maxPrice=20&category=Category1


userRouter.post('/signup',userController.signUp);

userRouter.post('/signin',userController.signIn);

export default userRouter;