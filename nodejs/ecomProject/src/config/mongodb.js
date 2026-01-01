import { MongoClient } from "mongodb";

//  mongodb://localhost:27017
const url = "mongodb://localhost:27017/ecomDB";

const connectToMongoDB = ()=>{
    MongoClient.connect(url)
    .then(client=>{
        console.log('MongoDB is Connected.');
    })
    .catch(err=>{
        console.log(err);
    })
    
}

export default connectToMongoDB;



