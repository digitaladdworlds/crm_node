const Joi = require("joi");

const validateBody = (requestData) => {
  const Schema = Joi.object({
    name: Joi.string().min(3).required(),
    email: Joi.string().email(),
    phoneNo: Joi.number()
      .integer()
      .min(1000000000)
      .max(9999999999)
      .required()
      .messages({
        "number.min": "Mobile number should be 10 digit.",
        "number.max": "Mobile number should be 10 digit",
      }),
    address: Joi.string(),
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

const validateCountryAndStateId = (requestData) => {
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

const validateCustomerId = (requestData) => {
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
    id: Joi.number().required(),
    name: Joi.string().min(3).required(),
    email: Joi.string().allow(null),
    phoneNo: Joi.string()
      .length(10)
      .pattern(/^[0-9]+$/)
      .required()
      .messages({
        "string.length": "Mobile number should be 10 digits.",
        "string.pattern.base": "Mobile number must contain only digits (0-9).",
      }),
    address: Joi.any().allow(null),
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

const validateCustomerNumber = (requestData) => {
  const Schema = Joi.object({
    phoneNo: Joi.number()
      .integer()
      .min(1000000000)
      .max(9999999999)
      .required()
      .messages({
        "number.min": "Mobile number should be 10 digit.",
        "number.max": "Mobile number should be 10 digit",
      }),
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
  validateCountryAndStateId,
  validateCustomerId,
  validateUpdateRequest,
  validateCustomerNumber,
};
