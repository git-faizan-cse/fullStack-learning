import ProductModel from './product.model.js';
export default class ProductController{

    getAllProducts(req, res){
        const products = ProductModel.getAll();
        res.status(200).send(products);
    }

    addProduct(req, res){
        if (!req.file) {
            return res.status(400).json({ error: 'Image file is required' });
        }

        const {name, price, sizes} = req.body;
        const newProduct = {
            name,
            price: parseFloat(price),
            sizes: sizes.split(','),
            imageUrl: req.file.filename,


        };

        const createdRecord = ProductModel.addPro(newProduct);
        res.status(201).send(createdRecord);

    }

    rateProduct(req, res){
        console.log(req.query);
        const userID = req.query.userID;
        const productID = req.query.productID;
        const rating = req.query.rating;
        console.log(userID);
        console.log(productID);
        console.log(rating);

        const error = ProductModel.rateProduct(userID, productID, rating);
        if(error){
            return res.status(401).send(error);
        }else {
            return res.status(200).send('Rating has been added');
        }
    }

    getOneProduct(req, res){
        const id = req.params.id;
        const oneProduct = ProductModel.get(id);
        if (!oneProduct){
            res.status(404).send('Product Not Found');
        }else {
            return res.status(200).send(oneProduct);
        }
    }

    filterProducts(req, res){
        const minPrice = req.query.minPrice;
        console.log(minPrice);
        const maxPrice = req.query.maxPrice;
        console.log(maxPrice);
        const category = req.query.category;
        console.log(category);
        const result = ProductModel.filter(minPrice, maxPrice, category);
        return res.status(200).send(result);
    }
}