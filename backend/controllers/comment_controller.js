import { Blog } from "../models/blog_model.js";
import { Comment } from "../models/comment_model.js";

export const addComment = async(req,res)=>{
    try {
        
        const {blog_id} = req.params;
        const {user_id, user_name, user_photo, comment_text} = req.body;

        if(!user_id || !comment_text){
            return res.status(400).json({
                success:false,
                message:"Enter your comment",
            });
        }

        const blog= await Blog.findById(blog_id);
        if(!blog){
            return res.status(400).json({
                success:false,
                message:"Blog not found",
            });
        }

        const postComment = await Comment.create({
            blog_id, user_id, user_name,user_photo, comment_text
        });

        return res.status(200).json({
            success:true,
            message:"Comment added successfully",
            postComment
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success:false,
            message:"Comment not posted",
        });
    }
}

export const getAllCommentsOfBlog = async(req,res)=>{


    try {

        const {blog_id} = req.params;

        const allComments = await Comment.find({blog_id}).sort({createdAt:-1});

        return res.status(200).json({

            success:true,
            count:allComments.length,
            allComments
        })


        
    } catch (error) {
        console.error(error);

        return res.status(500).json({

            success:false,
            message:"Something went wrong"
        })
    }
}