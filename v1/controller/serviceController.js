const {
  addServiceIndb,
  getAllServices,
  updateServicesIndb,
  deleteServicesIndb,
} = require("../services/crmService");
const {
  validateUserService,
  validateUserUpdateService,
  validateUserDeleteService,
} = require("../validation/servicesValidation");

const addServicee = async (req, res) => {
  try {
    let { service_name, service_desc } = req.body;
    const status = 1;
    // Check if service_name and service_desc are provided
    if (!service_name || !service_desc) {
      return res.badRequest({
        message:
          "Insufficient request parameters! service name and service desc are required.",
      });
    }

    // Validate service_name format and service_desc (use your own validation logic here)
    let validateRequest = validateUserService({
      service_name: service_name,
      service_desc: service_desc,
    });

    if (!validateRequest.isValid) {
      return res.validationError({
        message: `Invalid values in parameters, ${validateRequest.message}`,
      });
    }

    // Check if the service_name is already taken
    let existingService = await getUserByservice_name(service_name);
    if (existingService) {
      return res.badRequest({
        message: "service name is already registered.",
      });
    }

    // Create the user
    const newServicedb = {
      service_name: service_name,
      service_desc: service_desc,
      status: 1, // Active status
    };

    let result = await addServiceIndb(newServicedb);
    if (!result || result.status !== "success") {
      return res.badRequest({ message: "Failed to create user." });
    }

    // Optionally, send a verification service_name or take additional steps
    return res.success({
      data: result.data,
      message: "Sign up successful. Please verify your service_name.",
    });
  } catch (error) {
    console.error(error);
    return res.internalServerError({
      message: error.message,
    });
  }
};

const addService = async (req, res) => {
  try {
    let { service_name, service_desc } = req.body;
    if (!service_name || !service_desc) {
      return res.badRequest({
        message:
          "Insufficient request parameters! service Name and Status is required.",
      });
    }

    // Validate service_name format and service_desc (use your own validation logic here)
    let validateRequest = validateUserService({
      service_name: service_name,
      service_desc: service_desc,
    });

    if (!validateRequest.isValid) {
      return res.validationError({
        message: `Invalid values in parameters, ${validateRequest.message}`,
      });
    }

    const newServicedb = {
      service_name: service_name,
      service_desc: service_desc,
      status: 1, // Active status
    };

    // let result = await addNewProduct(req.body);
    let result = await addServiceIndb(newServicedb);
    if (result.status == 400) {
      return res.badRequest({ message: result.data });
    }
    return res.success({
      message: "Service added successfully",
      data: result.data,
    });
  } catch (error) {
    return res.internalServerError({ message: error.message });
  }
};

const getServiceList = async (req, res) => {
  try {
    let result = await getAllServices();

    if (result.status == 400) {
      return res.badRequest({ message: result.data });
    }
    if (result.status == 409) {
      return res.recordNotFound({ message: result.data });
    }
    return res.success({
      data: result.data,
      message: "Services fetched successfully",
    });
  } catch (error) {
    return res.internalServerError({ message: error.message });
  }
};

const updateServiceList = async (req, res) => {
  try {
    const { id, service_name, service_desc } = req.body;

    // Validate service_name format and service_desc (use your own validation logic here)
    let validateRequest = validateUserUpdateService({
      id: id,
      service_name: service_name,
      service_desc: service_desc,
    });

    if (!validateRequest.isValid) {
      return res.validationError({
        message: `Invalid values in parameters, ${validateRequest.message}`,
      });
    }

    let result = await updateServicesIndb(req.body);

    if (result.status == 400) {
      return res.badRequest({ message: result.data });
    }
    if (result.status == 409) {
      return res.recordNotFound({ message: result.data });
    }
    return res.success({
      data: result.data,
      message: "Services Updated successfully",
    });
  } catch (error) {
    return res.internalServerError({ message: error.message });
  }
};

const deleteService = async (req, res) => {
  try {
    const { id } = req.body;

    // Validate service_name format and service_desc (use your own validation logic here)
    let validateRequest = validateUserDeleteService({
      id: id
    });

    if (!validateRequest.isValid) {
      return res.validationError({
        message: `Invalid values in parameters, ${validateRequest.message}`,
      });
    }

    let result = await deleteServicesIndb(id);

    if (result.status == 400) {
      return res.badRequest({ message: result.data });
    }
    if (result.status == 409) {
      return res.recordNotFound({ message: result.data });
    }
    return res.success({
      data: result.data,
      message: "Services Updated successfully",
    });
  } catch (error) {
    return res.internalServerError({ message: error.message });
  }
};

module.exports = {
  addService,
  getServiceList,
  updateServiceList,
  deleteService,
};
