const { getClientAddTodayInDb, getClientAddMonthlyInDb, getClientAddTodayDetailsInDb, retrieveClientByDay, retrieveClientByMonth } = require("../services/dashboard");

const  getClientAddToday = async (req, res) => {
    try {
      const status = 1;
      let result = await getClientAddTodayInDb(status);
  
      if (result.status == 400) {
        return res.badRequest({ message: result.data });
      }
      if (result.status == 409) {
        return res.recordNotFound({ message: result.data });
      }
      return res.success({
        data: result.data,
        message: "Total Today Client Added fetched successfully",
      });
    } catch (error) {
      return res.internalServerError({ message: error.message });
    }
  };


  
const  getClientAddMonthly = async (req, res) => {
  try {
    const status = 1;
    let result = await getClientAddMonthlyInDb(status);

    if (result.status == 400) {
      return res.badRequest({ message: result.data });
    }
    if (result.status == 409) {
      return res.recordNotFound({ message: result.data });
    }
    return res.success({
      data: result.data,
      message: "Total Month Added Client fetched successfully",
    });
  } catch (error) {
    return res.internalServerError({ message: error.message });
  }
};






  
const  getClientAddTodayDetails = async (req, res) => {
  try {
    const status = 1;
    let result = await getClientAddTodayDetailsInDb(status);

    if (result.status == 400) {
      return res.badRequest({ message: result.data });
    }
    if (result.status == 409) {
      return res.recordNotFound({ message: result.data });
    }
    return res.success({
      data: result.data,
      message: "Total Month Added Client fetched successfully",
    });
  } catch (error) {
    return res.internalServerError({ message: error.message });
  }
};


 
  
const getClientPerDay = async (req, res) => {
  try {
  
const  status= 1 ;
    let result = await retrieveClientByDay(status);

    if (result.status == 400) {
      return res.badRequest({ message: result.data });
    }
    if (result.status == 409) {
      return res.recordNotFound({ message: result.data });
    }
    return res.success({
      data: result.data,
      message: "Client count per day fetched successfully",
    });
  } catch (error) {
    return res.internalServerError({ message: error.message });
  }
};



 
  
const getClientPerMonth = async (req, res) => {
  try {
  
const  status= 1 ;
    let result = await retrieveClientByMonth(status);

    if (result.status == 400) {
      return res.badRequest({ message: result.data });
    }
    if (result.status == 409) {
      return res.recordNotFound({ message: result.data });
    }
    return res.success({
      data: result.data,
      message: "Client count per day fetched successfully",
    });
  } catch (error) {
    return res.internalServerError({ message: error.message });
  }
};
 


  module.exports = {
    getClientAddToday , 
    getClientAddMonthly , 
    getClientAddTodayDetails ,
    getClientPerDay ,
    getClientPerMonth

  }