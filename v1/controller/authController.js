// authController.js

const authService = require("../services/auth");
const { hashPassword } = require("../services/common");
const { getUserByEmail, createUser } = require("../services/userService");
const {
  validateLogin,
  validateUserRegister,
} = require("../validation/authValidator");

const login = async (req, res) => {
  try {
    console.log(req.body);
    let { email, password } = req.body;
    if (!email || !password) {
      return res.badRequest({
        message:
          "Insufficient request parameters! email and password is required.",
      });
    }

    // Trim whitespace from email and password
    email = email.trim();
    password = password.trim();

    // if (email == "kai@gmail.com") {
    //   return res.badRequest({
    //     message:
    //       "Please utilize your own provided email address for better monitoring of your work.",
    //   });
    // }

    let validateRequest = validateLogin({ email: email, password: password });

    if (!validateRequest.isValid) {
      return res.validationError({
        message: `Invalid values in parameters, ${validateRequest.message}`,
      });
    }

    let result = await authService.loginUser(email, password);
    if (result.status == 400) {
      return res.badRequest({ message: result.data });
    }
    return res.success({
      data: result.data,
      message: "Login successful.",
    });
  } catch (error) {
    return res.internalServerError({ message: error.message });
  }
};

const signUp = async (req, res) => {
  try {
    let { email, password, confirmPassword } = req.body;

    // Check if email and password are provided
    if (!email || !password || !confirmPassword) {
      return res.badRequest({
        message:
          "Insufficient request parameters! email, password, and confirmPassword are required.",
      });
    }

    // Trim whitespace from email and password
    email = email.trim();
    password = password.trim();
    confirmPassword = confirmPassword.trim();

    // Validate email format and password (use your own validation logic here)
    let validateRequest = validateUserRegister({
      email: email,
      password: password,
      confirmPassword: confirmPassword,
    });

    if (!validateRequest.isValid) {
      return res.validationError({
        message: `Invalid values in parameters, ${validateRequest.message}`,
      });
    }

    // Check if passwords match
    if (password !== confirmPassword) {
      return res.validationError({
        message: "Passwords do not match.",
      });
    }

    // Check if the email is already taken
    let existingUser = await getUserByEmail(email);
    if (existingUser) {
      return res.badRequest({
        message: "Email is already registered.",
      });
    }

    // Hash the password before saving it to the database
    const hashedPassword = await hashPassword(password);

    // Create the user
    const newUser = {
      email: email,
      password: hashedPassword,
      status: 1, // Active status
    };

    let result = await createUser(newUser);
    if (!result || result.status !== "success") {
      return res.badRequest({ message: "Failed to create user." });
    }

    // Optionally, send a verification email or take additional steps
    return res.success({
      data: result.data,
      message: "Sign up successful. Please verify your email.",
    });
  } catch (error) {
    console.error(error);
    return res.internalServerError({
      message: error.message,
    });
  }
};

const logout = async (req, res) => {
  try {
    return res.success({ message: "Logged Out Successfully" });
  } catch (error) {
    return res.internalServerError({ message: error.message });
  }
};

module.exports = { login, signUp };
