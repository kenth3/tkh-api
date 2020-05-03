var Config = {
  host: "localhost",
  port: 8000,
  apiPath: "/1.0",
  postsPath: __dirname + "/posts",

  burnStatusUrl: "http://www.colorado.gov/airquality/advisory.aspx",
  burnStatusSelector: "#pTitle",

  databaseConnection: {
    host: "localhost:27017",
    database: "blog",
    user: "",
    password: "",
  },

  cors: true,

  authSecret: "your secret",

  mailKey: "your-mailgun-mailkey",
  mailDomain: "your-mailgun-domain",
  contactRecipientEmail: "email-address-of-contact-form-recipient",
};

module.exports = Config;
