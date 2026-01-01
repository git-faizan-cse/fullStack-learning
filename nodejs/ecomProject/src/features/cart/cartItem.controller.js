
import CartItemModel from "./cartItem.model.js";

export class CartItemController{
    add(req, res){
        const { productID, quantity } = req.query;
        const userID = req.userID;
        const result = CartItemModel.add(productID, userID, quantity);
        res.status(201).send(result);
    }

    get(req, res){
        const userID = req.userID;
        const result = CartItemModel.get(userID);
        return res.status(200).send(result);
    }

    delItem(req, res){
        const userID = req.userID;
        const cartItemID = req.params.id;
        const error = CartItemModel.deleteItem(cartItemID, userID);
        if(error){
            return res.status(404).send(error);
        }else{
            return res.status(200).send('Item deleted sucessfully');
        }
    }
}