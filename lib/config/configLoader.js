if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = "development";
}

var env = process.env.NODE_ENV;

console.log(`configLoader: loading env ${env}`);
module.exports = require(`./config.${env}`);
