import mongoose from "mongoose";


const connectDB = async ()=>{{
     try{

        await mongoose.connect(process.env.MONGO_URI)

        console.log("mongoDB connected success")

     }catch(error)
     {
        console.log ("Connection error",error)
     }
}}

export default connectDB;