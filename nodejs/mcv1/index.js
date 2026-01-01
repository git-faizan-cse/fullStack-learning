import express from 'express'
import ProductController from './src/controllers/product.controller.js'
import path from 'path'
import ejsLayouts from 'express-ejs-layouts'
import validateMiddleware from './src/middlewares/validation.middleware.js'
import { uploadFile } from './src/middlewares/file-upload.middleware.js'

const server = express()
server.use(express.static('public'));
// to parse the incoming request body
server.use(express.urlencoded({ extended: true }));

// setup view engine 
server.set('view engine', 'ejs')
server.set('views', path.resolve( 'src', 'views'));

//using middleware
server.use(ejsLayouts);


// create an instance of the controller
const productController = new ProductController();
server.get('/', productController.getProducts) 
server.get('/add-product', productController.getAddProduct)
server.get('/update-product/:id', productController.getUpdateProductView)
server.post('/delete-product/:id',productController.deleteProduct)

server.post('/',uploadFile.single('imageUrl'),validateMiddleware, productController.postAddProduct)
server.post('/update-product',productController.postUpdateProduct)

server.use(express.static('src/views'));

server.listen(3100, () => {         
    console.log('Server is running on http://localhost:3100');   
})

