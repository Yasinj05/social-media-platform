import { Request, Response } from "express";
import mongoose, { Types } from "mongoose";
import Post, { IComment } from "../models/Post";
import User from "../models/User";
import dotenv from "dotenv";
dotenv.config();

interface AuthRequest extends Request {
  user?: {
    id: string;
  };
}

export const createPost = async (req: AuthRequest, res: Response) => {
  const { text } = req.body;
  if (!text) {
    return res.status(400).json({ message: "Text is required" });
  }

  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: "User not authenticated" });
    }
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const newPost = new Post({
      text,
      user: new mongoose.Types.ObjectId(req.user.id),
    });
    const post = await newPost.save();
    res.json(post);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

export const getPosts = async (req: AuthRequest, res: Response) => {
  try {
    const posts = await Post.find()
      .populate("user", ["username"])
      .sort({ date: -1 });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

export const getPostById = async (req: AuthRequest, res: Response) => {
  try {
    const post = await Post.findById(req.params.id).populate("user", [
      "username",
    ]);
    if (!post) {
      return res.status(404).json({ message: "Post with given id not found" });
    }
    res.json(post);
  } catch (err) {
    console.error((err as Error).message);
    if ((err as any).kind === "ObjectId") {
      return res.status(404).json({ msg: "Post not found" });
    }
    res.status(500).send("Server error");
  }
};

export const deletePost = async (req: AuthRequest, res: Response) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    if (post.user.toString() !== req.user!.id) {
      return res.status(401).json({ message: "User not authorized" });
    }

    await Post.deleteOne({ _id: req.params.id });

    res.json({ message: "Post removed" });
  } catch (err) {
    console.error((err as Error).message);
    if ((err as any).kind === "ObjectId") {
      return res.status(404).json({ message: "Post not found" });
    }
    res.status(500).send("Server error");
  }
};
