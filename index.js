const express = require("express");
require("express-async-errors");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");
const userRouter = require("./routes/user");
const authRouter = require("./routes/auth");
const productRouter = require("./routes/product");
const payRouter = require("./routes/stripe");
const cartRouter = require("./routes/cart");
const orderRouter = require("./routes/order");
//connect db
const connectDB = require("./db/connect");
//Error Handler Middleware
const authenticateUser = require("./middleware/authentication");
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

app.use(cors());

app.use(express.json());
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/products", productRouter);
app.use("/api/v1/cart", cartRouter);
app.use("/api/v1/orders", orderRouter);
app.use("/checkout", payRouter);

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
