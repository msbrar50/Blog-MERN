import express from "express";

import { addComment,getAllCommentsOfBlog } from "../controllers/comment_controller.js";

const router = express.Router();

router.post("/:blog_id", addComment);

router.get("/:blog_id", getAllCommentsOfBlog);


export default router;