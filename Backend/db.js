const mongoose=require('mongoose');
require('dotenv').config()

async function connectToMongoDB(){
    try{
        await mongoose.connect(process.env.MongoDb_URL);
        console.log("connected to mongoDb")
        const db = mongoose.connection.db;
        const collection = db.collection('Pizza_Data');
        const fetchedData = await collection.find({}).toArray();

        global.pizzaData=fetchedData;
    }
    catch(error){
        console.error("Error connecting to mongoDb",error);
    }
}

module.exports=connectToMongoDB;