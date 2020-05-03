const Config = require("../../config/configLoader");
const Handlers = require("./handlers");
const apiPath = (path) => Config.apiPath + path;

console.log("adding contact routes");

module.exports = [
  {
    path: apiPath("/contact"),
    method: "POST",
    handler: Handlers.contact,
  },
];
