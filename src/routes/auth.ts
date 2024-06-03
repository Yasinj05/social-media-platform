import { Router, Request, Response } from "express";
import { login, register } from "../controllers/authController";

const router = Router();

// Register
router.post("/register", register);

// Login
router.post("/login", login);

export default router;
