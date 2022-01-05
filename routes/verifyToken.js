const jwt = require("jsonwebtoken");
const { StatusCodes } = require("http-status-codes");
const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    jwt.verify(authHeader, process.env.JWT_SECRET, (err, decodedToken) => {
      if (err) {
        res.status(StatusCodes.UNAUTHORIZED).json({
          message: "Invalid Token",
        });
      }
      req.user = decodedToken;
      // console.log(req.user);
      next();
    });
  } else {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "You are not authorized to access this page" });
  }
};

const verfifyTokenandAuthorize = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      res.status(StatusCodes.UNAUTHORIZED).json({});
    }
  });
};

const verifyTokenAndAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.isAdmin === "true") {
      next();
    } else {
      res.status(403).json("You are not alowed to do that!");
    }
  });
};

module.exports = { verifyToken, verfifyTokenandAuthorize, verifyTokenAndAdmin };
