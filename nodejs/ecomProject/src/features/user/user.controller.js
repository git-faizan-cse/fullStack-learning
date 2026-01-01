import { UserModel } from "./user.model.js";
import jwt from 'jsonwebtoken';

export class UserController{

    signUp(req, res){
        const {name, email, password, type} = req.body;
        const user = UserModel.SignUp(name, email, password, type);
        res.status(201).send(user);
    }

    signIn(req, res){
        const {email, password} = req.body;
        console.log(email);
        console.log(password);
        const result = UserModel.SignIn(email, password);
        if(!result){
            return res.status(400).send('Incorrect Credentials');
        } else {
            // create a token 
            const token = jwt.sign({userID: result.id, email: result.email},"AIb6d35fvJM409pXqXQNla2jBCH9kuLz", {expiresIn:'1h',});
            // send a token

            res.status(200).send(token);
        }
    }
}