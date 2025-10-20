import express from "express";

import { addComment,deleteComment,getAllCommentsOfBlog, updateComment } from "../controllers/comment_controller.js";

const router = express.Router();

router.post("/:blog_id", addComment);

router.get("/:blog_id", getAllCommentsOfBlog);

router.delete("/:comment_id",deleteComment)

router.put("/:comment_id", updateComment);



export default router;