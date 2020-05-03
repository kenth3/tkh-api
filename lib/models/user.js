const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let User = new Schema({
  /** 
      userName. Should be unique, is required and indexed.
    */
  userName: {
    type: String,
    unique: true,
    required: true,
  },

  email: {
    type: String,
    unique: true,
    required: true,
  },

  /** 
      password. It can only contain string, is required field.
    */
  password: {
    type: String,
    required: true,
  },

  /** 
    Scope. It can only contain string, is required field, and should have value from enum array.
    */
  scope: {
    type: String,
    enum: ["Admin", "BlogAdmin", "BlogUser"],
    required: true,
  },
});

module.exports = mongoose.model("User", User);
