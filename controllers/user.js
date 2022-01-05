const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const {
  BadRequestError,
  UnauthenticatedError,
  NotFoundError,
} = require("../errors/index");
// const {verifyTokenAdmin} = require('../routes/verifyToken');

//get all users
const getAllUsers = async (req, res) => {
  const users = await User.find({}).select("-password");
  const userCount = users.length;
  //   console.log(users);
  res.status(StatusCodes.OK).json({ users, total: userCount });
};

//get user by id

const getUser = async (req, res) => {
  try {
    const user = await User.findById({ _id: req.params.id }).select(
      "-password"
    );

    if (!user) {
      throw new NotFoundError("Job not found");
    }
    res.status(200).json(user);
  } catch {
    throw new BadRequestError("Requested User not found");
  }
};

const deleteUser = async (req, res) => {
  res.send("delete user");
};

module.exports = { getAllUsers, getUser };
