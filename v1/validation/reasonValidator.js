const Joi = require("joi");

const validateBody = (requestData) => {
  const Schema = Joi.object({
    name: Joi.string().min(3).required(),
    status: Joi.number().required(),
  });

  const { error } = Schema.validate(requestData, {
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

const validateDeleteId = (requestData) => {
  const Schema = Joi.object({
    id: Joi.string().required(),
  });

  const { error } = Schema.validate(requestData, {
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

const validateUpdateRequest = (requestData) => {
  const Schema = Joi.object({
    id: Joi.string().required(),
    name: Joi.string().min(3).required(),
  });

  const { error } = Schema.validate(requestData, {
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

const validateReasonId = (requestData) => {
  const Schema = Joi.object({
    id: Joi.string().required(),
  });

  const { error } = Schema.validate(requestData, {
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
  validateBody,
  validateDeleteId,
  validateUpdateRequest,
  validateReasonId,
};
