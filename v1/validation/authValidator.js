const Joi = require("joi");

const validateLogin = (requestData) => {
  const loginSchema = Joi.object({
    email: Joi.string().email().trim().required(),
    password: Joi.string().min(4).trim().required(),
  });

  const { error } = loginSchema.validate(requestData, {
    abortEarly: false,
    convert: false,
  });

  if (error) {
    const message = error.details.map((el) => el.message).join("\n");
    return {
      isValid: false,
      message,
    };
  }
  return { isValid: true };
};

const validateUserRegister = (requestData) => {
  const loginSchema = Joi.object({
    email: Joi.string().email().trim().required(),
    password: Joi.string().min(4).trim().required(),
    confirmPassword: Joi.string().min(4).trim().required(),
  });

  const { error } = loginSchema.validate(requestData, {
    abortEarly: false,
    convert: false,
  });

  if (error) {
    const message = error.details.map((el) => el.message).join("\n");
    return {
      isValid: false,
      message,
    };
  }
  return { isValid: true };
};

module.exports = { validateLogin , validateUserRegister };
