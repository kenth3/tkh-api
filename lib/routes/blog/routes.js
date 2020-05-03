const Config = require("../../config/configLoader");
const Handlers = require("./handlers");
const apiPath = (path) => Config.apiPath + path;

console.log(
  `adding blog routes at path: ${Config.host}:${Config.port}${apiPath(
    "/posts"
  )}`
);

module.exports = [
  {
    path: apiPath("/posts"),
    method: "GET",
    handler: Handlers.posts,
  },
  {
    path: apiPath("/posts/category/{category}"),
    method: "GET",
    handler: Handlers.posts,
  },
  {
    path: apiPath("/posts/tag/{tag}"),
    method: "GET",
    handler: Handlers.postsByTag,
  },
  {
    path: apiPath("/post/{name}"),
    method: "GET",
    handler: Handlers.post,
  },
  {
    path: apiPath("/post/{name}/edit"),
    method: "GET",
    handler: Handlers.postForEdit,
    config: {
      auth: {
        strategy: "jwt",
        scope: ["Admin"],
      },
    },
  },
  {
    path: apiPath("/post"),
    method: "POST",
    handler: Handlers.savePost,
    config: {
      auth: {
        strategy: "jwt",
        scope: ["Admin"],
      },
    },
  },
  {
    path: apiPath("/categories"),
    method: "GET",
    handler: Handlers.categories,
  },
  {
    path: apiPath("/tags"),
    method: "GET",
    handler: Handlers.tags,
  },

  {
    path: apiPath("/seed"),
    method: "GET",
    handler: Handlers.seed,
  },
];
