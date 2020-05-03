const jwt = require("jsonwebtoken");
const User = require("../models/user");
const Config = require("../config/configLoader");

let TokenService = {};

TokenService.createToken = function (user) {
  return jwt.sign(
    {
      id: user._id,
      username: user.userName,
      scope: user.scope,
    },
    Config.authSecret,
    {
      algorithm: "HS256",
      expiresIn: "168h",
    }
  );
};

module.exports = TokenService;
