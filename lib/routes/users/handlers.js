const userService = require("../../services/userService");
const tokenService = require("../../services/tokenService");
const Boom = require("@hapi/boom");
var Joi = require("@hapi/joi");

let Handlers = {};

Handlers.users = async () => {
  try {
    const users = await userService.getUsers();
    return users;
  } catch (err) {
    return Boom.wrap(err);
  }
};

Handlers.seed = async (request) => {
  const validation = Joi.object().keys({
    userName: Joi.string().max(50).required(),
    email: Joi.string().email().required(),
    password: Joi.string().max(32).required(),
  });

  const { error, value } = validation.validate(request.payload);

  if (error) {
    return Boom.badRequest(`Seed info not valid: ${error}`);
  }

  try {
    const user = await userService.seed(
      value.userName,
      value.email,
      value.password
    );
    return user;
  } catch (err) {
    return Boom.badRequest(err);
  }
};

Handlers.login = async (request, h) => {
  const validation = Joi.object().keys({
    userName: Joi.string().max(50).required(),
    password: Joi.string().max(32).required(),
  });

  const { error, value } = validation.validate(request.payload);

  if (error) {
    return Boom.badRequest(`Login info not valid: ${error}`);
  }

  try {
    const user = await userService.validateUser(value.userName, value.password);
    const token = tokenService.createToken(user);

    return h.response({ token }).code(201);
  } catch (err) {
    return Boom.unauthorized(err.message);
  }
};

module.exports = Handlers;
