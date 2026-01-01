

export default class ProductModel{
    constructor( _id, _name, _desc, _price, _imageUrl){
        this.id = _id;
        this.name = _name;
        this.desc = _desc;
        this.price = _price;
        this.imageUrl = _imageUrl;
    }

    static get(){
        return products;
    }

    static add(product){
        let newProduct = new ProductModel(
            products.length + 1,
            product.name,
            product.desc,
            product.price,
            product.imageUrl
        );

        products.push(newProduct);
        // products.push(product);
    }

    static getById(id){
        return products.find((p) => p.id == id);
    }

    static update(productObj){
        const index = products.findIndex(
            (p) => p.id == productObj.id
        );
        products[index] = productObj;
    }
    
    static deletePro(id){
        const index = products.findIndex( p => p.id == id );
        products.splice(index,1);
    }
}
var products = [
    new ProductModel(1, 'Product 1', 'This is product 1', 100, 'https://via.placeholder.com/150'),
    new ProductModel(2, 'Product 2', 'This is product 2', 200, 'https://via.placeholder.com/150'),
    new ProductModel(3, 'Product 3', 'This is product 3', 300, 'https://via.placeholder.com/150'),
]
