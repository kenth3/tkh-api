const Config = require("../config/configLoader");
const mongoose = require("mongoose");
const authInfo = Config.databaseConnection.user
  ? `${Config.databaseConnection.user}:${Config.databaseConnection.password}@`
  : "";
const connectionString = `mongodb://${authInfo}${Config.databaseConnection.host}/${Config.databaseConnection.database}`;

let DatabaseConnection = {};
let connection = null;

DatabaseConnection.openConnection = function (callback) {
  mongoose.connect(connectionString);
  connection = mongoose.connection;
  mongoose.Promise = global.Promise;
  mongoose.connection.on("open", function () {
    console.log("We have connected to mongodb");
    callback();
  });
};

DatabaseConnection.closeConnection = function () {
  connection.close(function () {
    console.log(
      "Mongoose default connection disconnected through app termination"
    );
    process.exit(0);
  });
};

module.exports = DatabaseConnection;
