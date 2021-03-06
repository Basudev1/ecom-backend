const User = require("../models/User");
const {
  verifyToken,
  verfifyTokenandAuthorize,
  verifyTokenAndAdmin,
} = require("./verifyToken");
const {
  getAllUsers,
  getUser,
  deleteUser,
  updateUser,
  userStats,
} = require("../controllers/user");

const router = require("express").Router();

//GET all users
router.get("/", verifyTokenAndAdmin, getAllUsers);
//GET USER STATS

router.get("/stats", verifyTokenAndAdmin, userStats);
//Get user by id
router.get("/:id", verifyTokenAndAdmin, getUser);

//delete user by id
router.delete("/:id", verifyTokenAndAdmin, deleteUser);

//user stats

//update user by id:
// router.put("/:id", verfifyTokenandAuthorize, updateUser);

//overall user status

//UPDATE
// router.put("/:id", verifyTokenAndAuthorization, async (req, res) => {
//   if (req.body.password) {
//   }

//   try {
//     const updatedUser = await User.findByIdAndUpdate(
//       req.params.id,
//       {
//         $set: req.body,
//       },
//       { new: true }
//     );
//     res.status(200).json(updatedUser);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

//DELETE
// router.delete("/:id", verifyTokenAndAuthorization, async (req, res) => {
//   try {
//     await User.findByIdAndDelete(req.params.id);
//     res.status(200).json("User has been deleted...");
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

//GET USER
// router.get("/find/:id", verifyTokenAndAdmin, async (req, res) => {
//   try {
//     const user = await User.findById(req.params.id);
//     const { password, ...others } = user._doc;
//     res.status(200).json(others);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

//GET ALL USER
// router.get("/", verifyTokenAndAdmin, async (req, res) => {
//   const query = req.query.new;
//   try {
//     const users = query
//       ? await User.find().sort({ _id: -1 }).limit(5)
//       : await User.find();
//     res.status(200).json(users);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

module.exports = router;
