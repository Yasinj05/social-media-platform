import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoute from "./routes/auth";
import postRoute from "./routes/posts";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use("/api", authRoute);
app.use("/api", postRoute);

mongoose
  .connect(process.env.MONGODB_URI!)
  .then(() => {
    console.log("Connected to the MongoDB...");
    app.listen(PORT, () => {
      console.log(`Server is Running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log("Connection error", error);
  });
