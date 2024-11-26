const db = require("../../database/connection").promise();
const {
  getClientAddTodayQuery,
  getClientAddMonthlyQuery,
  getClientAddTodayDetailsQuery,
  getClientPerDateQuery,
  getClientPerMonthQuery,
} = require("./dbQueries");

const getClientAddTodayInDb = async (status) => {
  try {
    const [result] = await db.execute(getClientAddTodayQuery, [status]);
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

const getClientAddMonthlyInDb = async (status) => {
  try {
    const [result] = await db.execute(getClientAddMonthlyQuery, [status]);
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

const getClientAddTodayDetailsInDb = async (status) => {
  try {
    const [result] = await db.execute(getClientAddTodayDetailsQuery, [status]);
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

const retrieveClientByDay = async (status) => {
  try {
    let queryResult;
 
      [queryResult] = await db.execute(getClientPerDateQuery, [
        status
      ]);

    if (queryResult.length === 0) {
      return {
        status: 400,
        data: "Error occurred during querying the database",
      };
    }

    // Function to convert UTC date to Indian Standard Time (IST)
    const convertUTCtoIST = (utcDate) => {
      const date = new Date(utcDate);
      // Adjust for Indian Standard Time (IST) offset (+5 hours and 30 minutes)
      date.setHours(date.getHours() + 5);
      date.setMinutes(date.getMinutes() + 30);
      return date;
    };

 


    // Get the current year and month
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1;

    // Create an array of dates for the current month
    const datesArray = Array.from(
      { length: new Date(year, month, 0).getDate() },
      (_, i) => i + 1
    );

    // Create an object to store call counts for each date
    const clientCounts = queryResult.reduce((acc, { addClientDate, clientCount }) => {
      // Convert UTC addClientDate to Indian Standard Time (IST)
      const istDate = convertUTCtoIST(addClientDate);
      // Extract the date part (day) from IST date
      const date = istDate.getDate();
      acc[date] = clientCount;
      return acc;
    }, {});

    // Create an array of call counts for each date
    const clientCountArray = datesArray.map((date) => clientCounts[date] ?? 0);

    return {
      status: 200,
      data: { datesArray: datesArray, clientCountArray: clientCountArray },
    };
  } catch (error) {
    throw new Error(error.message);
  }
};



const retrieveClientByMonth = async (status) => {
  try {
    let queryResult;

    // Execute the monthly query
    [queryResult] = await db.execute(getClientPerMonthQuery, [status]);

    if (queryResult.length === 0) {
      return {
        status: 400,
        data: "Error occurred during querying the database",
      };
    }


    // Convert UTC date to IST
    const convertUTCtoIST = (utcDate) => {
      const date = new Date(utcDate);
      date.setHours(date.getHours() + 5);
      date.setMinutes(date.getMinutes() + 30);
      return date;
    };

    // Get the current year and month
    const currentDate = new Date();
    const year = currentDate.getFullYear();

    // Create an array of months for the current year
    const monthsArray = Array.from({ length: 12 }, (_, i) => i + 1);

    // Create an object to store client counts for each month
    const clientCounts = queryResult.reduce((acc, { addClientmonth, clientCountMonth }) => {
      acc[addClientmonth] = clientCountMonth;
      return acc;
    }, {});

    // Create an array of client counts for each month
    const clientCountArray = monthsArray.map(
      (addClientmonth) => clientCounts[addClientmonth] ?? 0
    );

    return {
      status: 200,
      data: { monthsArray, clientCountArray },
    };
  } catch (error) {
    throw new Error(error.message);
  }
};










module.exports = {
  getClientAddTodayInDb,
  getClientAddMonthlyInDb,
  getClientAddTodayDetailsInDb,
  retrieveClientByDay ,
  retrieveClientByMonth
};
