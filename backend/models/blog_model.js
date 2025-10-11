import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({

    title:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,

    },
     
    photoUrl:{
        type:String,
        default:"",
    },
    createdAt:{
        type:Date,
        default:Date.now,
    },
    

},
{ collection: "blogs" }
)

export const Blog = mongoose.model("Blog",blogSchema);