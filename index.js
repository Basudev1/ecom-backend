const express = require("express");
require("express-async-errors");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();
const userRouter = require("./routes/user");
const authRouter = require("./routes/auth");
//connect db
const connectDB = require("./db/connect");
//Error Handler Middleware
const authenticateUser = require("./middleware/authentication");
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

app.use(express.json());
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/cart", authenticateUser, userRouter);

//using middleware
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

//Connect to MongoDB
const port = process.env.PORT || 3000;
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
