const Config = require("../config/configLoader");
var Mailgun = require("mailgun-js");

let ContactService = {};

ContactService.sendContactForm = async (name, email, message) => {
  const mailgun = new Mailgun({
    apiKey: Config.mailKey,
    domain: Config.mailDomain,
  });
  const data = {
    from: email, //'noreply@thomaskenthurd.com',
    to: Config.contactRecipientEmail,
    subject: `Message from ${name} (TKH Contact Form)`,
    text: message,
  };

  await mailgun.messages().send(data);
};

module.exports = ContactService;
