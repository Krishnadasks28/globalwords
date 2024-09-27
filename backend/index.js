import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import { CustomError } from "./errorHandler/error.js";
import userRouter from "./routes/user.route.js";

import mongoose from "mongoose";


mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("Database Connected."))
  .catch((err) => console.log("Error in connecting to database : ", err));

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true, // Allow cookies to be sent
  })
);
app.use(express.static("public"));
app.use(express.json());

app.use("/user", userRouter);

///error handler
app.use((err, req, res, next) => {
  console.log(err);
  if (err instanceof CustomError) {
    res.status(err.status_code).json({
      success: false,
      message: err.message,
    });
  } else {
    res.status(500).json({
      success: false,
      message: "Internal Server Error!!!",
    });
  }
});

const PORT = process.env.PORT | 3000;

app.listen(PORT, () => console.log("Server running..."));
