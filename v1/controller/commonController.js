const { validateCountryAndStateId } = require("../validation/common");
// const {
//   getAllCountry,
//   getStateList,
//   getCitiesList,
// } = require("../Services/common");


const getCountryList = async (req, res) => {
  try {
    let result = await getAllCountry();

    if (result.status == 400) {
      return res.badRequest({ message: result.data });
    }
    if (result.status == 409) {
      return res.recordNotFound({ message: result.data });
    }
    return res.success({
      data: result.data,
      message: "Countries fetched successfully",
    });
  } catch (error) {
    return res.internalServerError({ message: error.message });
  }
};

const getStatesByCountry = async (req, res) => {
  try {
    let countryId = req.params.id;

    if (!countryId) {
      return res.badRequest({
        message: "Insufficient request parameters! Country Id  is required .",
      });
    }

    let validateRequest = validateCountryAndStateId({
      id: countryId,
    });

    if (!validateRequest.isValid) {
      return res.validationError({
        message: `Invalid values in parameters, ${validateRequest.message}`,
      });
    }

    let result = await getStateList(countryId);

    if (result.status == 400) {
      return res.badRequest({ message: result.data });
    }
    if (result.status == 409) {
      return res.recordNotFound({ message: result.data });
    }
    return res.success({
      data: result.data,
      message: "States List fetched successfully",
    });
  } catch (error) {
    return res.internalServerError({ message: error.message });
  }
};
const getCitiesByStates = async (req, res) => {
  try {
    let stateId = req.params.id;

    if (!stateId) {
      return res.badRequest({
        message: "Insufficient request parameters! State Id  is required .",
      });
    }

    let validateRequest = validateCountryAndStateId({
      id: stateId,
    });

    if (!validateRequest.isValid) {
      return res.validationError({
        message: `Invalid values in parameters, ${validateRequest.message}`,
      });
    }

    let result = await getCitiesList(stateId);

    if (result.status == 400) {
      return res.badRequest({ message: result.data });
    }
    if (result.status == 409) {
      return res.recordNotFound({ message: result.data });
    }
    return res.success({
      data: result.data,
      message: "Cities List fetched successfully",
    });
  } catch (error) {
    return res.internalServerError({ message: error.message });
  }
};

module.exports = {
  getCountryList,
  getStatesByCountry,
  getCitiesByStates, 
};
