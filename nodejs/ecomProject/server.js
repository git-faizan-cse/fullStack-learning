// Import Express 
import express from "express";
import swagger from 'swagger-ui-express';
import cors from 'cors';

import productRouter from './src/features/product/product.routes.js';
import bodyParser from 'body-parser';
import userRouter from "./src/features/user/user.routes.js";
// import basicAuthorizer from "./src/middlewares/basicAuth.middleware.js";
import jwtAuth from "./src/middlewares/pwt.middleware.js";
import cartRouter from "./src/features/cart/cartItem.routes.js";
import apiDocs from './swagger.json' assert {type:'json'};
import loggerMiddleware from "./src/middlewares/logger.middleware.js";
import connectToMongoDB from "./src/config/mongodb.js";

// Create Server
const server = express();
// CORS policy configuration.
// server.use((req, res, next) =>{
//     res.header('Access-Control-Allow-Origin', 'http://localhost:5500');
//     res.header('Access-Control-Allow-Headers', '*');
//     res.header('Access-Control-Allow-Methods', '*');
//     // return Okay for preflight request.
//     if(req.method == "OPTIONS"){
//         return res.sendStatus(200);
//     }
//     next();
// })

// use Cors lib in express 
server.use(cors());
// user body parser for transforming data into json
server.use(bodyParser.json());

server.use('/api-docs', swagger.serve, swagger.setup(apiDocs));
// use logger middleware to keep track.
server.use(loggerMiddleware);
// for all requests related to products, redirect to product routes.
// we can use basicAuthorizer and jwtAuth .
server.use('/api/products',jwtAuth ,productRouter);
server.use('/api/cartItems',jwtAuth ,cartRouter);
server.use('/api/users', userRouter);

// default request handler
server.get('/', (req, res) =>{
    res.send('Welcome to Ecommerce APIs');
})

server.use((req, res) =>{
    res.status(404).send('API not found. Please check our documentation for more information at localhost:3200/api-docs');
})

//specify port number
server.listen(3200, ()=> {
    console.log('Server is listening at localhost:/3200 ');
    connectToMongoDB();
})

