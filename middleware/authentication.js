const user = require("../models/User");
const jwt = require("jsonwebtoken");
const { unAuthenticatedError } = require("../errors");

const auth = (req, res, next) => {
  //check authheader

  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    throw new unAuthenticatedError("Invalid token");
  }
  const token = authHeader.split(" ")[1];

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    //attach the job to the route
    req.user = { userId: payload.userId, name: payload.name };
    next();
  } catch (error) {
    throw new unAuthenticatedError("Invalid token");
  }
};
module.exports = auth;
