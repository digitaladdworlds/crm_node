const Joi = require("joi");

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

const validateUniqueId = (requestData) => {
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
  validateCountryAndStateId,
  validateUniqueId
};
