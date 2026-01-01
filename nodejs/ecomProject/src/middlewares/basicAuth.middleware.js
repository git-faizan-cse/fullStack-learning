import { UserModel } from "../features/user/user.model.js";

const basicAuthorizer = (req, res, next) => {

    // 1 check if authorization header is empty.
    const authHeader = req.headers["authorization"];
    console.log(authHeader);
    if(!authHeader){
        return res.status(401).send("No authorization details found");

    }
    // 2 extract the credentials 
    const base64Credentials = authHeader.replace('Basic ','');
    console.log(base64Credentials);

    // Decode credentials 
    const decodedCreds = Buffer.from(base64Credentials, 'base64').toString('utf8');
    console.log(decodedCreds);
    const creds = decodedCreds.split(':');

    // 4. 
    const user = UserModel.getAll().find( u=> u.email == creds[0] && u.password == creds[1]);
    if(user){
        next();
    } else {
        return res.status(401).send('Incorrect Credentials');
    }

}

export default basicAuthorizer;