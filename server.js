const fs = require("fs");
const Hapi = require("@hapi/hapi");
const Inert = require("@hapi/inert");
const HapiAuthJwt = require("hapi-auth-jwt2");
const Config = require("./lib/config/configLoader");
const DatabaseConnection = require("./lib/services/databaseConnection");

const init = async () => {
  let connectionConfig = {
    host: Config.host,
    port: Config.port,
  };

  if (Config.cors !== undefined) {
    connectionConfig.routes = { cors: Config.cors };
  }

  const server = new Hapi.Server(connectionConfig);
  // server.connection(connectionConfig);

  await server.register(HapiAuthJwt);

  const validateToken = async (decoded, request, h) => {
    return {
      isValid:
        decoded.id !== undefined &&
        decoded.username !== undefined &&
        decoded.scope !== undefined,
    };
  };

  // setup a jwt based auth strategy
  server.auth.strategy("jwt", "jwt", {
    key: Config.authSecret,
    validate: validateToken,
    verifyOptions: { algorithms: ["HS256"] },
  });

  await server.register(Inert);

  // register the routes in each area
  fs.readdirSync(__dirname + "/lib/routes").forEach((dir) =>
    server.route(require(`./lib/routes/${dir}/routes`))
  );

  // register the route that loads the aurelia front end
  // server.route({
  //   path: "/",
  //   method: "GET",
  //   handler: function (request, reply) {
  //     reply().redirect("/public");
  //   },
  // });

  // server.route({
  //   path: "/public/{path*}",
  //   method: "GET",
  //   handler: {
  //     directory: { path: __dirname + "/public" },
  //   },
  // });

  // connect to the database first
  DatabaseConnection.openConnection(function () {
    server.start({
      address: Config.host,
      port: Config.port,
    });
    console.log(
      `Listening on ${server.info.uri} (Host: ${Config.host}, Port: ${Config.port})`
    );
  });

  // close our connection when the server stops
  // server.on("stop", () => {
  //   DatabaseConnection.closeConnection();
  //   console.log("Server has stopped.");
  // });
};

init();
