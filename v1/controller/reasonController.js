const { addNewReason, getAllReason, updateReasonInDb, deleteReasonFromDb } = require("../services/reasonService");
const { validateBody, validateUpdateRequest, validateDeleteId } = require("../validation/reasonValidator");

const addReason = async (req, res) => {
    try {
      req.body["status"] = 1;

      let { name, status } = req.body;
      if (!name || !status) {
        return res.badRequest({
          message:
            "Insufficient request parameters! Name and Status is required.",
        });
      }
  
      let validateRequest = validateBody(req.body);
  
      if (!validateRequest.isValid) {
        return res.validationError({
          message: `Invalid values in parameters, ${validateRequest.message}`,
        });
      }
      let result = await addNewReason(req.body);

      if (result.status == 400) {
        return res.badRequest({ message: result.data });
      }
      return res.success({
        message: "Reason added successfully",
        data: result.data
      });
    } catch (error) {
      return res.internalServerError({ message: error.message });
    }
  };
  
  const getReasonList = async (req, res) => {
    try {
  
      let result = await getAllReason( );
  
      if (result.status == 400) {
        return res.badRequest({ message: result.data });
      }
      if (result.status == 409) {
        return res.recordNotFound({ message: result.data });
      }
      return res.success({
        data: result.data,
        message: "Reason fetched successfully",
      });
    } catch (error) {
      return res.internalServerError({ message: error.message });
    }
  };





  const updateReason = async (req, res) => {
    try {
      let reasonId = req.params.id;
      let reasonUpdatedName = req.body.name;
  
      if (!reasonId || !reasonUpdatedName) {
        return res.badRequest({
          message:
            "Insufficient request parameters! Status Id and Name is required .",
        });
      }
  
      let validateRequest = validateUpdateRequest({
        id: reasonId,
        name: reasonUpdatedName,
      });
  
      if (!validateRequest.isValid) {
        return res.validationError({
          message: `Invalid values in parameters, ${validateRequest.message}`,
        });
      }
  
      let result = await updateReasonInDb(reasonUpdatedName, reasonId);
  
      if (result.status == 400) {
        return res.badRequest({ message: result.data });
      }
      return res.success({
        data: result.data,
        message: "Reason updated successfully",
      });
    } catch (error) {
      return res.internalServerError({ message: error.message });
    }
  };
  
 

  const deleteReason = async (req, res) => {
    try {
    
      let reasonId = req.params.id;
  
      if (!reasonId) {
        return res.badRequest({
          message: "Insufficient request parameters! Reason Id is required.",
        });
      }
  
      let validateRequest = validateDeleteId(req.params);
  
      if (!validateRequest.isValid) {
        return res.validationError({
          message: `Invalid values in parameters, ${validateRequest.message}`,
        });
      }
  
      let result = await deleteReasonFromDb(reasonId);
  
      if (result.status == 400) {
        return res.badRequest({ message: result.data });
      }
      return res.success({
        data: result.data,
        message: "Reason deleted successfully",
      });
    } catch (error) {
      return res.internalServerError({ message: error.message });
    }
  };













  module.exports = {
    addReason ,
    getReasonList ,
    deleteReason , 
    updateReason
     
  }