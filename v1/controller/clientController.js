const {
  createCustomer,
  getClientList,
  updateClientInDb,
  createClient,
  deleteClientFromDb,
 
} = require("../services/clientService");
const {
  validateBody,
  validateDeleteId,
  validateCustomerId,
  validateUpdateRequest,
} = require("../validation/clientValidation");

const addClient = async (req, res) => {
  try {
    req.body["status"] = 1;
    let { name, email, phoneNo, address } = req.body;
    if (!name || !phoneNo) {
      return res.badRequest({
        message:
          "Insufficient request parameters! Name and Phone number is required.",
      });
    }

    let validateRequest = validateBody(req.body);

    if (!validateRequest.isValid) {
      return res.validationError({
        message: `Invalid values in parameters, ${validateRequest.message}`,
      });
    }

    // req.body.userId = req._user.id; // Logged In User Id

    let result = await createClient(req.body);

    if (result.status == 400) {
      return res.badRequest({ message: result.data });
    }
    return res.success({
      message: "Customer added successfully",
      data: result.data,
    });
  } catch (error) {
    return res.internalServerError({ message: error.message });
  }
};

const getAllClient = async (req, res) => {
  try {
    const status = 1;
    let result = await getClientList(status);

    if (result.status == 400) {
      return res.badRequest({ message: result.data });
    }
    if (result.status == 409) {
      return res.recordNotFound({ message: result.data });
    }
    return res.success({
      data: result.data,
      message: "Client fetched successfully",
    });
  } catch (error) {
    return res.internalServerError({ message: error.message });
  }
};

const deleteClient = async (req, res) => {
  try {
    let clientId = req.params.id;

    if (!clientId) {
      return res.badRequest({
        message: "Insufficient request parameters! clientId Id is required.",
      });
    }

    let validateRequest = validateDeleteId(req.params);

    if (!validateRequest.isValid) {
      return res.validationError({
        message: `Invalid values in parameters, ${validateRequest.message}`,
      });
    }

    let result = await deleteClientFromDb(clientId);

    if (result.status == 400) {
      return res.badRequest({ message: result.data });
    }
    return res.success({
      data: result.data,
      message: "clientId deleted successfully",
    });
  } catch (error) {
    return res.internalServerError({ message: error.message });
  }
};

const getClientById = async (req, res) => {
  try {
    let customerId = req.params.id;

    if (!customerId) {
      return res.badRequest({
        message: "Insufficient request parameters! Status Id  is required .",
      });
    }

    let validateRequest = validateCustomerId({
      id: customerId,
    });

    if (!validateRequest.isValid) {
      return res.validationError({
        message: `Invalid values in parameters, ${validateRequest.message}`,
      });
    }

    let result = await getCustomerFromDb(customerId);

    if (result.status == 400) {
      return res.badRequest({ message: result.data });
    }
    return res.success({
      data: result.data,
      message: "Customer data fetched successfully",
    });
  } catch (error) {
    return res.internalServerError({ message: error.message });
  }
};

const updateClient = async (req, res) => {
  try {
    req.body["status"] = 1;
    let clientId = req.params.id;

    if (!clientId) {
      return res.badRequest({
        message: "Insufficient request parameters! Client Id  is required .",
      });
    }
    req.body.id = parseInt(clientId);
    req.body.phoneNo = req.body.phoneNo.toString();
    let updatedData = req.body;

    let validateRequest = validateUpdateRequest(updatedData);

    if (!validateRequest.isValid) {
      return res.validationError({
        message: `Invalid values in parameters, ${validateRequest.message}`,
      });
    }

    req.body.phoneNo = parseInt(req.body.phoneNo);

    let updateClient = await updateClientInDb(updatedData);

    if (updateClient.status == 400) {
      return res.badRequest({ message: updateClient.data });
    }

    return res.success({
      data: updateClient.data,
      message: "Client updated successfully",
    });
  } catch (error) {
    return res.internalServerError({ message: error.message });
  }
};

module.exports = {
  addClient,
  getAllClient,
  deleteClient,
  getClientById,
  updateClient,
};
