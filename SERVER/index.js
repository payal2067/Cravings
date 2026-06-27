 import dotenv from "dotenv";
dotenv.config();

import express from "express";



const app = express();

// app.use(express.json());

// app.use("/auth", AuthRouter);
// app.use("/public", PublicRouter);

//Default API
app.get("/", (req, res) => {
  console.log("Default Get API Hit");
  res.json({ message: "Welcome to my Cravins Project" });
});

//Default Error Handler
// app.use((err, req, res, next) => {
//   const ErrMessage = err.message || "Internal Server Error";
//   const ErrStausCode = err.statusCode || 500;

//   res.status(ErrStausCode).json({ message: ErrMessage });
// });
const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log("Server Started on port:", port);
  connectDB();
});
