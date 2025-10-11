import { Blog } from "../models/blog_model.js";
import fs from "fs";

export const  addBlog = async(req,res)=>{

    try {
        
        const {title,description} = req.body;
        const photoUrl = req.file ? req.file.path :null;

        if(!title || !description )
        {
            return res.status(400).json({
                success:false,
                message:"Enter the title and description",
            });
        }


        const myBlog = new Blog({title,description,photoUrl})
        await myBlog.save()

        return res.status(400).json({
            success:true,
            message:"Blog uploaded!",
        });

    } catch (error) {
        console.error(error);

        return res.status(400).json({
            success:false,
            message:"blog not uploaded!!!!!!!!",
        });
        
    }
}


export const showAllBlogs = async(req,res)=>{

    try {

        const blogs = await Blog.find({},"title photoUrl");

        return res.status(200).json({
            success:true,
            count:blogs.length,
           blogs
        });
        
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success:false,
            message:"failed to fetch blogs",
        });
    }
}


export const getBlogDetails = async(req,res)=>{

    try {

 
        const {id} = req.params;
        const blog = await Blog.findById(id);

        if(!blog){
            return res.status(400).json({
                success:false,
                message:`${blog.title} blog not found`
            });
        }

        return res.status(200).json({
            success:true,
            blog
        });
        
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success:false,
            message:"failed to fetch blog details",
        });
    }
}



export const deleteBlog = async(req,res)=>{

    try {

 
        const {id} = req.params;
        const blog = await Blog.findByIdAndDelete(id);

        if(!blog){
            return res.status(400).json({
                success:false,
                message:`${blog.title} blog not found`
            });
        }

        return res.status(200).json({
            success:true,
            message:"Blog deleted successfully"
        });
        
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success:false,
            message:"failed to delete blog",
        });
    }
}




export const updateBlog = async(req,res)=>{

    try {

 
        const {id} = req.params;

        const { title, description } = req.body;

        const blog = await Blog.findById(id);
        if (!blog) {
          return res.status(404).json({
            success: false,
            message: "Blog not found",
          });
        }

        const updatedData = {};
    if (title) updatedData.title = title;
    if (description) updatedData.description = description;


    //update image and replace old image
    if (req.file) {
        if (blog.photoUrl) {
          fs.unlink(blog.photoUrl, (err) => {
            if (err) console.log("Failed to delete old image:", err);
          });
        }
        updatedData.photoUrl = req.file.path || {};
      }
  

      const updatedBlog = await Blog.findByIdAndUpdate(id, updatedData, {
        new: true,
      });
  

        if(!updatedBlog){
            return res.status(400).json({
                success:false,
                message:`${blog.title} blog not found`
            });
        }

        return res.status(200).json({
            success:true,
            message:"Blog updated successfully",
            blog:updatedBlog,
        });
        
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success:false,
            message:"failed to update blog",
        });
    }
}


