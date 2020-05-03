//const Boom = require('@hapi/boom');
const fs = require("fs");
const path = require("path");
const _ = require("lodash");
const marked = require("marked"); // also consider "hoedown"
const Config = require("../config/configLoader");
const posts = require("./postsData");

let PostsService = {};

PostsService.getPosts = function (category, cb) {
  // unfiltered
  if (!category) return cb(posts);

  // filter by category
  cb(_.filter(posts, (post) => post.category === category));
};

PostsService.getPostsByTag = function (tag, cb) {
  // filter by tag
  cb(
    _.filter(posts, (post) => {
      return _.includes(post.tags, tag);
    })
  );
};

PostsService.getPost = function (file, cb) {
  let post = _.find(posts, { file });

  if (post) {
    const isHtml = post.html;
    const extension = isHtml ? ".html" : ".md";

    // load the file
    let filePath = `./posts/${post.file}${extension}`;

    fs.readFile(filePath, (err, data) => {
      if (err) cb(err, null);

      let contents = data.toString();

      // convert from md to html if necessary
      var html = isHtml ? contents : marked(contents);

      cb(null, html);
    });
  } else {
    cb(null, null);
  }
};

PostsService.getCategories = function (cb) {
  let categories = [];

  _.forEach(posts, (post) => {
    if (!_.find(categories, (cat) => cat === post.category))
      categories.push(post.category);
  });

  cb(categories);
};

PostsService.getTags = function (cb) {
  let tags = [];

  _.forEach(posts, (post) => {
    _.forEach(post.tags, (postTag) => {
      let existingTag = _.find(tags, (tag) => tag.name === postTag);
      if (!existingTag) {
        tags.push({ name: postTag, count: 1 });
      } else {
        existingTag.count++;
      }
    });
  });

  cb(tags);
};

module.exports = PostsService;
