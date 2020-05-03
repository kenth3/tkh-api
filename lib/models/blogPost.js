const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let BlogPostSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  file: {
    type: String,
    required: true,
    trim: true,
  },
  html: {
    type: Boolean,
    required: true,
    default: false,
  },
  postDate: {
    type: Date,
    required: true,
  },
  category: {
    type: String,
    required: true,
    trim: true,
  },
  tags: [String],
  preview: {
    type: String,
    required: true,
    trim: true,
  },
  fullContent: {
    type: String,
    required: true,
    trim: true,
  },
});

module.exports = mongoose.model("BlogPost", BlogPostSchema);
