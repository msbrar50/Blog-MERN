import express from "express";

import upload from "../upload.js";
import { addBlog, deleteBlog, getBlogDetails, showAllBlogs, updateBlog } from "../controllers/blog_controller.js";


const router = express.Router();

router.post("/add",upload.single("photoUrl"),addBlog);

router.get("/getAllBlogs",showAllBlogs)

router.get("/:id",getBlogDetails)

router.get("/deleteBlog/:id",deleteBlog)


router.put("/updateBlog/:id",upload.single("photoUrl"),updateBlog)

export default router;