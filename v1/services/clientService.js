const db = require("../../database/connection").promise();
const {
  searchClientByEmailPhoneQuery,
  createClientQuery,
  getAllCustomerQuery,
  updateClientQuery,
  deleteClientQuery,
} = require("./dbQueries");

const createClient = async (inputData) => {
  try {
    if (inputData.phoneNo) {
      const phoneNumber = inputData.phoneNo;
      const email = inputData.email;
      let response = await findClientByEmailORNumber(phoneNumber, email);
      if (response.length >= 1) {
        return {
          status: 400,
          data: response.message,
        };
      }
    }

    const [result] = await db.execute(createClientQuery, [
      inputData.name || null,
      `91${inputData.phoneNo}` || null,
      inputData.email || null,
      inputData.address || null,
      inputData.status || 1,
    ]);
    if (result.affectedRows === 1) {
      return {
        status: 200,
        data: result,
        customerId: result.insertId,
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

const deleteClientFromDb = async (clientId) => {
  try {
    const [result] = await db.execute(deleteClientQuery, ["0", clientId]);

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

const updateClientInDb = async (updatedData) => {
  try {
    if (updatedData.phoneNo) {
      const phoneNumber = updatedData.phoneNo;
      const email = updatedData.email;
      let response = await findClientByEmailORNumber(phoneNumber, email);
      if (response.length >= 1) {
        return {
          status: 400,
          data: response.message,
        };
      }
    }
    const [result] = await db.execute(updateClientQuery, [
      updatedData.name || null ,
      updatedData.email || null,
      updatedData.phoneNo || null,
      updatedData.address || null,
      updatedData.status || null,
      updatedData.id || null,
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

const findClientByEmailORNumber = async (email, phoneNo) => {
  try {
    let [result] = await db.execute(searchClientByEmailPhoneQuery, [
      email,
      phoneNo,
    ]);

    const dataLength = result.length;

    if (dataLength == 0) {
      return {
        status: 200,
        length: dataLength,
        data: null,
        message: "Email does not exist",
      };
    } else {
      return {
        status: 200,
        length: dataLength,
        data: result,
        message: "Email already exist",
      };
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

const getClientList = async (status) => {
  try {
    const [result] = await db.execute(getAllCustomerQuery, [status]);
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

module.exports = {
  createClient, 
  deleteClientFromDb,
  updateClientInDb,
  getClientList,
};
