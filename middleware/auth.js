const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = function(req, res, next) {
  //Get Token From Header
  const token = req.header("x-auth-token");
  //Check if not a token
  if (!token) {
    return res.status(401).json({
      msg: "No Token, Authorization Denied"
    });
  }

  //Verify Token
  try {
    const decoded = jwt.verify(token, config.get("jwtSecret"));
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({
      msg: "Token is Not Valid"
    });
  }
};
