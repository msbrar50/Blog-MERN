import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({

    user_id:{
        type:String,
        required:true,
    },

    blog_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Blog",
        required:true,
    },
    comment_text:{
        type:String,
        required:true,

    },
    
    user_name:{
        type:String,
        default:"Anonymous",
    },
    user_photo:{
        type:String,
        default:"",
    },

    
    createdAt:{
        type:Date,
        default:Date.now,
    },
    

},
{ collection: "comments" }
)

export const Comment = mongoose.model("Comment",commentSchema);