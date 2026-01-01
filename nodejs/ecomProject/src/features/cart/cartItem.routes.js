
// to manages routes or paths to CartItem controller 

// 1 import express 
import express from 'express';
import {CartItemController} from './cartItem.controller.js';

// initialize router 
const cartRouter = express.Router();

const cartController = new CartItemController();

cartRouter.post('/', cartController.add);
cartRouter.get('/', cartController.get);
cartRouter.delete('/:id',cartController.delItem);

export default cartRouter;