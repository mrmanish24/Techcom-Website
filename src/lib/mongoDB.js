import mongoose from "mongoose";

 const connectMongoDB = async ()=>{
    try{
        await mongoose.connect(process.env.MONGO_URL);
        console.log("connect to MongoDB successful");
    }

    catch(error){
        console.log(`there is error in connecting to  database: ${error}`)
    }
}

export default connectMongoDB;