let contactService = require("../../services/contactService");
let Boom = require("@hapi/boom");
let Joi = require("@hapi/joi");

let Handlers = {};

Handlers.contact = async (request) => {
  var validation = Joi.object().keys({
    name: Joi.string().max(50).required(),
    email: Joi.string().email().required(),
    message: Joi.string().required(),
  });

  const { error, value } = validation.validate(request.payload);

  if (error) {
    return Boom.badRequest(`Invalid contact form information: ${error}`);
  }

  try {
    await contactService.sendContactForm(
      value.name,
      value.email,
      value.message
    );
  } catch (err) {
    return Boom.wrap(err);
  }

  return {
    success: true,
    message: "Your contact request was successfully sent.",
  };
};

module.exports = Handlers;
