import { Router } from "express";
import auth from "../middleware/auth";
import {
  createPost,
  getPosts,
  getPostById,
  deletePost,
  likePost,
  unlikePost,
  commentOnPost,
  deleteComment,
} from "../controllers/postController";

const router = Router();

// Create a post
router.post("/posts", auth, createPost);

// Get all posts
router.get("/posts", getPosts);

// Get a single post by ID
router.get("/posts/:id", getPostById);

// Delete a post
router.delete("/posts/:id", auth, deletePost);

// Like a post
router.put("/posts/like/:id", auth, likePost);

// Unlike a post
router.put("/posts/unlike/:id", auth, unlikePost);

// Comment on a post
router.post("/posts/comment/:id", auth, commentOnPost);

// Delete a comment
router.delete("/posts/comment/:id/:comment_id", auth, deleteComment);

export default router;
