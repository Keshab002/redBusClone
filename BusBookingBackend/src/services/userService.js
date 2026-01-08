const userModel = require("../models/userModel");

const registerUserService = async (userData) => {
  return await userModel.registerUserModel(userData);
};

const loginUserService = async ({ emailId, password }) => {
  return await userModel.loginUserModel({ emailId, password });
};

module.exports = {
  registerUserService,
  loginUserService
};
