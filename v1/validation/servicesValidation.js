const Joi = require("joi");

const validateUserService = (requestData) => {
  const loginSchema = Joi.object({
    service_name: Joi.string().required(),
    service_desc: Joi.string().min(10).required(),
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

const validateUserUpdateService = (requestData) => {
  const loginSchema = Joi.object({
    id: Joi.number().required(),
    service_name: Joi.string().required(),
    service_desc: Joi.string().min(10).required(),
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

const validateUserDeleteService = (requestData) => {
  const loginSchema = Joi.object({
    id: Joi.number().required(),
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

module.exports = {
  validateUserService,
  validateUserUpdateService,
  validateUserDeleteService,
};
