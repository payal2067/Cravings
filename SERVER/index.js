 import dotenv from "dotenv";
dotenv.config();

import express from "express";
import connectDB from "./src/config/dbConnection.config.js";

const app = express();



//Default API
app.get("/", (req, res) => {
  console.log("Default Get API Hit");
  res.json({ message: "Welcome to my Cravins Project"});
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log("Server Started on port:", port);
  connectDB();
});
