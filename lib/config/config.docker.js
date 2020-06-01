var Config = {
  host: "0.0.0.0", //'localhost',
  port: 8000,
  apiPath: "/1.0",
  postsPath: __dirname + "/posts",

  databaseConnection: {
    host: "tkhdb:27017",
    database: "blog",
  },

  cors: true,

  authSecret: env.process.AUTH_SECRET,

  mailKey: env.process.MAIL_KEY,
  mailDomain: env.process.MAIL_DOMAIN,
  contactRecipientEmail: env.process.RECIPIENT_EMAIL,
};

module.exports = Config;
