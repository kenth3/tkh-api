let postsService = require("../../services/postsService");
let Boom = require("@hapi/boom");
var Joi = require("@hapi/joi");

let Handlers = {};

Handlers.posts = async (request) => {
  const category = request.params.category;

  const posts = await postsService.getPosts(category);
  return posts;
};

Handlers.postsByTag = async (request) => {
  const tag = request.params.tag;
  const posts = await postsService.getPostsByTag(tag);
  return posts;
};

Handlers.post = async (request) => {
  const postName = request.params.name;

  try {
    const html = await postsService.getPostContent(postName);

    return html === null
      ? Boom.notFound(`Post with name ${postName} not found.`)
      : html;
  } catch (err) {
    Boom.badRequest(err.message);
  }
};

Handlers.postForEdit = async (request) => {
  const postName = request.params.name;
  const post = await postsService.getPostForEdit(postName);
  return post;
};

Handlers.savePost = async (request) => {
  var validation = Joi.object().keys({
    userName: Joi.string().max(50).required(),
    email: Joi.string().email().required(),
    password: Joi.string().max(32).required(),
  });

  const savedPost = await postsService.savePost(request.payload);
  return { savedPost };
};

Handlers.categories = async () => {
  const categories = await postsService.getCategories();
  return categories;
};

Handlers.tags = async () => {
  const tags = await postsService.getTags();
  return tags;
};

Handlers.seed = async () => {
  const results = await postsService.seedData();

  return results.error ? Boom.badImplementation(error.message) : results;
};

module.exports = Handlers;
