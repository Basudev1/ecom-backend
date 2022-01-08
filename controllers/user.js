const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const {
  BadRequestError,
  UnauthenticatedError,
  NotFoundError,
} = require("../errors/index");
const bcrypt = require("bcryptjs");
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
    const user = await User.findOne({ _id: req.params.id }).select("-password");

    if (!user) {
      throw new NotFoundError("User not found");
    }
    res.status(200).json(user);
  } catch {
    throw new BadRequestError("Requested User not found");
  }
};

const deleteUser = async (req, res) => {
  try {
    const user = await User.findOneAndDelete({ _id: req.params.id });

    if (!user) {
      throw new NotFoundError("User not found");
    }
    res.status(200).json({ msg: "User has been deleted" });
  } catch {
    throw new BadRequestError("User not found or already deleted");
  }
};
const updateUser = async (req, res) => {
  let getpassword = req.body.password;
  if (getpassword) {
    const salt = await bcrypt.genSalt(10);
    const newPassword = await await bcrypt.hash(getpassword, salt);

    try {
      const user = await User.findOneAndUpdate(
        {
          _id: req.params.id,
          // password: newPassword,
          password: newPassword,
        },
        { new: true }
      );

      console.log(req.params.id);
      console.log(newPassword);

      if (!user) {
        throw new NotFoundError("User not found");
      }
      return res.status(200).json({ msg: "Password has been Updated" });
    } catch (err) {
      console.log(err);
      throw new BadRequestError("Something went wrong");
    }
  }
};

const userStats = async (req, res) => {
  const date = new Date();
  const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));

  try {
    const data = await User.aggregate([
      { $match: { createdAt: { $gte: lastYear } } },
      {
        $project: {
          month: { $month: "$createdAt" },
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: 1 },
        },
      },
    ]);
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = { getAllUsers, getUser, deleteUser, updateUser, userStats };
