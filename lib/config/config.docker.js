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

  authSecret: process.env.AUTH_SECRET,

  mailKey: process.env.MAIL_KEY,
  mailDomain: process.env.MAIL_DOMAIN,
  contactRecipientEmail: process.env.RECIPIENT_EMAIL,
};

module.exports = Config;
