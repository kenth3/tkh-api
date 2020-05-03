const User = require("../models/user");
const bcrypt = require("bcrypt");

let UserService = {};

// allows the creation of the admin user only if there aren't already users
UserService.seed = async (userName, email, password) => {
  const users = await User.find().select("userName").exec();

  if (users && users.length) {
    throw new Error("Users already exist!");
  }

  const admin = {
    userName: userName,
    email: email,
    scope: "Admin",
    password: password,
  };

  const user = await UserService.saveUser(admin);
  return user;
};

// lists users.  TODO: add filter capability.
UserService.getUsers = async () => {
  const users = await User.find().select("userName email scope -_id").exec();

  return users;
};

// validates a username and password against an existing user
UserService.validateUser = async (userName, password) => {
  const user = await User.findOne({ userName }).exec();

  if (!user) {
    throw new Error("User not found.");
  }

  const valid = await bcrypt.compare(password, user.password);

  if (!valid) {
    throw new Error("Password does not match.");
  }

  return user;
};

// saves a new or existing user
UserService.saveUser = async (user) => {
  if (!user.userName || !user.email || !user.scope) {
    throw new Error("userName, email, and scope must all be specified.");
  }

  let userToSave = await User.findOne({ userName: user.userName }).exec();

  // no user found, so add a new one
  if (userToSave == null) {
    if (!user.password) {
      throw new Error("A new user must specify a password.");
    }

    userToSave = new User({ userName: user.userName });
  }

  userToSave.email = user.email;
  userToSave.scope = user.scope;

  // only update the password if it's not empty
  if (user.password != "") {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(user.password, salt);
    userToSave.password = hash;
  }

  const savedUser = await userToSave.save();
  return savedUser;
};

module.exports = UserService;
