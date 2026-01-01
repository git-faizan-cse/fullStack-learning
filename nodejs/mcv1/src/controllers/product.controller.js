import path from 'path';
import ProductModel from '../models/product.model.js';


export default class ProductController{
    getProducts(req,res) {

        let products = ProductModel.get();
        // console.log(products);

        res.render('products', {products});

        // res.sendFile(path.join(path.resolve( 'src', 'views', 'products.ejs')));
    }

    getAddProduct(req, res ,next) {
    return res.render('new-product',{errorMessage: null});
    }

    postAddProduct(req, res ,next) {
        
        ProductModel.add(req.body);
        let products = ProductModel.get();
        // After adding the product, redirect to the products page
        res.render('products', {products});
    }

    getUpdateProductView(req, res, next){
        // if product exist return view
        const id = req.params.id;
        const productFound = ProductModel.getById(id);
        if(productFound){
            res.render('update-product', {
                product: productFound,
                errorMessage: null,
            });
        }
        // else return error
        else {
            res.status(401).send('Product Not Found.')
        }
    }

    postUpdateProduct(req, res, next){
        ProductModel.update(req.body);
        let products = ProductModel.get();
        // After adding the product, redirect to the products page
        res.render('products', {products});
    }

    deleteProduct(req, res, next){
        const id = req.params.id;
        const productFound = ProductModel.getById(id);
        if(!productFound){
            return res.status(401).send('Product Not Found.');
        }
            
        ProductModel.deletePro(id);
        let products = ProductModel.get();
        res.render('products', {products});
    }

    }
// }



