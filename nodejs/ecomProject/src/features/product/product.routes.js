
// to manages routes or paths to product controller 

// 1 import express 
import express from 'express';
import ProductController from './product.controller.js';
import upload from '../../middlewares/fileupload.middleware.js';

// initialize router 
const productRouter = express.Router();

const productController = new ProductController;

// all the paths to controller methods.
// localhost:3200/api/products/filter?minPrice=10&maxPrice=20&category=Category1
productRouter.get('/filter',productController.filterProducts);

productRouter.get('/',productController.getAllProducts);

productRouter.post('/',upload.single('imageUrl'), productController.addProduct);

productRouter.get('/:id',productController.getOneProduct);
productRouter.post('/rate',productController.rateProduct);

export default productRouter;