const { getUserByEmailQuery, setUserByEmailQuery } = require("./dbQueries");
const db = require("../../database/connection").promise();


const getUserByEmail = async (email) => {
    try {
      // Execute the query
      const [rows] = await db.execute(getUserByEmailQuery, [email]);
      // Check if we got rows back and return the first row if found
      if (rows && Array.isArray(rows) && rows.length > 0) {
        return rows[0]; // Return the first user if found
      } else {
        return null; // No user found with the provided email
      }
    } catch (error) {
      console.error("Error while checking if user exists:", error);
      throw new Error("Database error");
    }
  };
  
  

  const createUser = async (newUser) => {
    try {
      const [result] = await db.execute(setUserByEmailQuery, [
        newUser.email,
        newUser.password,
        newUser.status,
      ]);
      // Check if a row was inserted successfully
      if (result && result.affectedRows > 0) {
        return {
          status: 'success',
          data: { email: newUser.email, status: newUser.status },
        };
      } else {
        return {
          status: 'error',
          message: 'User creation failed.',
        };
      }
    } catch (error) {
      console.error("Error while creating user:", error);
      throw new Error("Database error");
    }
  };





 
   








  

module.exports = {
  getUserByEmail,
  createUser,
};
