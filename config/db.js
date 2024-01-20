import mongoose from "mongoose";
import colors from "colors";  

const connectDB = async () =>{
    try{
        await mongoose.connect(process.env.MONGO_URL);
        console.log(`Connected to MongoDB database ${mongoose.connection.host}` .bgMagenta.white);

    }catch(error){
        console.log("MongoDB Database Error: ", error)
    }
}

export default connectDB;