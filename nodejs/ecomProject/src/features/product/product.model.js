import { UserModel } from "../user/user.model.js";

export default class ProductModel {
    constructor(
        id,
        name,
        desc,
        price,
        imageUrl,
        category,
        sizes
    ) {
        this.id = id;
        this.name = name;
        this.desc = desc;
        this.price = price;
        this.imageUrl = imageUrl;
        this.category = category;
        this.sizes = sizes;

    }

    static getAll(){
        return products;
    }

    static get(id){
        const product = products.find(i => i.id == id);
        return product;
    }

    static addPro(product){
        product.id = products.length+1;
        products.push(product);
        return product;
    }

    static filter(minPrice, maxPrice, category){
        console.log(minPrice);
        console.log(maxPrice);
        console.log(category);
        const result = products.filter((product) => {
            return (
            /*!minPrice || */ (!minPrice || product.price >= minPrice) &&
            /*!maxPrice || */ (!maxPrice || product.price <= maxPrice) &&
            /*!category || */ (!category || product.category == category)
            );
        });
        console.log(result);
        return result;
        
    }

    static rateProduct(userID, productID, rating){
        // 1. Validate user and product.
        const user = UserModel.getAll().find( (u) => u.id == userID);
        if(!user){
            return 'User Not Found.';
        }
        // validate product.
        const product = products.find( (u) => u.id == productID);
        if(!product){
            return 'Product Not Found.';
        }
        // Check if there are any ratings and if not then add ratings array.
        if(!product.ratings){
            product.ratings = [];
            product.ratings.push({
                userID: userID,
                rating: rating
            });
        } else {
            // check if this user has already given rating.
            const existingRatingIndex = product.ratings.findIndex( r=> r.userID == userID);

            if(existingRatingIndex >= 0){
                product.ratings[existingRatingIndex] = {
                    userID: userID,
                    rating: rating
                }
            } else {
                // if no existing rating.
                product.ratings.push({
                userID: userID,
                rating: rating
            });
            }
        }


    }
}

let products = [
    new ProductModel(
        1,
        'Product 1',
        'Discription of Product 1',
        19.99,
        '',
        'Category1',

    ),
    new ProductModel(
        2,
        'Product 2',
        'Discription of Product 2',
        29.99,
        '',
        'Category2',
        ['M', 'XL']
    ),
    new ProductModel(
        3,
        'Product 3',
        'Discription of Product 3',
        39.99,
        '',
        'Category3',
        ['M', 'XL', 'S']
    ),

];