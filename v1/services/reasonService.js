const db = require("../../database/connection").promise();
const { createReasonQuery, searchReasonQuery, getAllReasonQuery, updateReasonQuery } = require("./dbQueries");

const addNewReason = async (inputData) => {
    try { 
      if (inputData.name) {
        const reasonName = inputData.name;
        let response = await searchReasonTable(reasonName);
        if (response?.length >= 1) {
          return {
            status: 400,
            data: "Reason already exist",
          };
        }
      }
      const [result] = await db.execute(createReasonQuery, [
        inputData.name,
        inputData.status,
      ]);
      if (result.affectedRows === 1) {
        return {
          status: 200,
          data: result,
        };
      } else {
        return {
          status: 400,
          data: "Data Insertion Failed",
        };
      }
    } catch (error) {
      throw new Error(error.message);
    }
  };
  
  const searchReasonTable = async (reasonName) => {
    try {
      let [result] = await db.execute(searchReasonQuery, [reasonName]);
      const dataLength = result?.length;
  
      if (dataLength == 0) {
        return {
          status: 200,
          length: dataLength,
          data: null,
          message: "Reason not found",
        };
      } else {
        return {
          status: 200,
          length: dataLength,
          data: result,
          message: "Reason found successfully",
        };
      }
    } catch (error) {
      throw new Error(error.message);
    }
  };
  
  const getAllReason = async ( ) => {
    try 
  {
    const [result] = await db.execute(getAllReasonQuery);
  
      if (result.length === 0) {
        return {
          status: 409,
          data: "No data found",
        };
      } else {
          return {
            status: 200,
            data: result,
          };
      }
    } catch (error) {
      throw new Error(error.message);
    }
  };



  const deleteReasonFromDb = async (reasonId) => {
    try {
      const [result] = await db.execute(deleteReasonQuery, ["0", reasonId]);
  
      if (result.affectedRows === 1) {
        return {
          status: 200,
          data: result,
        };
      } else {
        return {
          status: 400,
          data: "Some error occured during querying the database",
        };
      }
    } catch (error) {
      throw new Error(error.message);
    }
  };
  
  const updateReasonInDb = async (reasonName, reasonId) => {
    try {
      const status = 1 
      if (reasonName) {
        let response = await searchReasonTable(reasonName);
  
        if (response.length >= 1) {
          return {
            status: 400,
            data: "Reason already exist",
          };
        }
      }
  
      const [result] = await db.execute(updateReasonQuery, [
        reasonName,
        reasonId,
        status
      ]);
  
      if (result.affectedRows === 1) {
        return {
          status: 200,
          data: result,
        };
      } else {
        return {
          status: 400,
          data: "Some error occured during querying the database",
        };
      }
    } catch (error) {
      throw new Error(error.message);
    }
  };













  module.exports = {
    addNewReason ,
    getAllReason ,
    deleteReasonFromDb ,
    updateReasonInDb

  }