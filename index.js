const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();
const userRouter = require("./routes/user");
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Db connect success");
  })
  .catch((err) => {
    console.log("Db connect error", err);
  });
app.use(express.json());
app.use("/api/user", userRouter);
app.use("/api/user", userRouter);

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
