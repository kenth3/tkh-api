const Config = require("../../config/configLoader");
const Handlers = require("./handlers");
const apiPath = (path) => Config.apiPath + path;

console.log("adding users routes");

module.exports = [
  {
    path: apiPath("/users"),
    method: "GET",
    handler: Handlers.users,
    config: {
      auth: {
        strategy: "jwt",
        scope: ["Admin"],
      },
    },
  },
  {
    path: apiPath("/users/seed"),
    method: "POST",
    handler: Handlers.seed,
  },
  {
    path: apiPath("/users/login"),
    method: "POST",
    handler: Handlers.login,
  },
];
