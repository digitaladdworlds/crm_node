const common = require("./common");
const { getUserByEmailQuery } = require("./dbQueries");
const db = require("../../database/connection").promise();


const loginUser = async (email, password) => {
  try {
    const [user] = await db.execute(getUserByEmailQuery, [email]);
    const dataLength = user.length;
    if (dataLength > 1) {
      return {
        status: 400,
        data: "Multiple User Found",
      };
    }

    const userData = user[0];

    if (!user || dataLength == 0) {
      return {
        status: 400,
        data: "User not exists",
      };
    }

    if (password) {
      const userPassword = userData.password;
      let isPasswordMatched = await common.isPasswordMatch(
        password,
        userPassword
      );

      if (!isPasswordMatched) {
        return {
          status: 400,
          data: "Incorrect Password",
        };
      }
    }

    let token;
    token = await common.generateToken(userData, process.env.JWT_SECRET);

    let userToReturn = {
      token,
    };

    return {
      data: userToReturn,
    };
  } catch (error) {
    throw new Error(error.message);
  }
};

const signUpUser = async (email, password) => {
  try {
    const [user] = await db.execute(getUserByEmailQuery, [email ]);

    const dataLength = user.length;

    if (dataLength > 1) {
      return {
        status: 400,
        data: "Multiple User Found",
      };
    }

    const userData = user[0];

    if (!user || dataLength == 0) {
      return {
        status: 400,
        data: "User not exists",
      };
    }

    if (password) {
      const userPassword = userData.password;
      let isPasswordMatched = await common.isPasswordMatch(
        password,
        userPassword
      );

      if (!isPasswordMatched) {
        return {
          status: 400,
          data: "Incorrect Password",
        };
      }
    }

    let token;
    token = await common.generateToken(userData, process.env.JWT_SECRET);

    let userToReturn = {
      token,
    };

    return {
      data: userToReturn,
    };
  } catch (error) {
    throw new Error(error.message);
  }
};

 


// const getAdminDetails = async () => {
//   try {
//     const [result] = await db.execute(getAdminDetailsQuery, [1]);

//     if (result.length >= 1) {
//       return {
//         status: 200,
//         data: result,
//       };
//     } else {
//       return {
//         status: 400,
//         data: "Data Insertion Failed",
//       };
//     }
//   } catch (error) {
//     throw new Error(error.message);
//   }
// };

module.exports = { loginUser , signUpUser };
