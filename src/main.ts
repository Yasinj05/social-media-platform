import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoute from "./routes/auth";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use("/api", authRoute);

mongoose
  .connect(process.env.MONGODB_URI!)
  .then(() => {
    console.log("Connected to the MongoDB...");
    app.listen(PORT, () => {
      console.log(`server is Running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log("Connection error", error);
  });
