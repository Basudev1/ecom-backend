const express = require("express");
const router = express.Router();

router.get("/test", (req, res) => {
  res.send("testuser");
});

router.post("/post", (req, res) => {
  const user = req.body.username;
  res.send(user);
});

module.exports = router;
