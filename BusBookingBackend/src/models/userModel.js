const { writeJSON, readJSON } = require("../utils/fileHelper");
const usersFilePath = "./src/data/users.json";

const registerUserModel = async (userData) => {
  // Logic to save user data to a JSON file or database
  let users = [];
  try {
    users = await readJSON(usersFilePath);
  } catch (error) {
    // If file doesn't exist, start with an empty array
    users = [];
  }
  users.push(userData);
  await writeJSON(usersFilePath, users);
  return userData;
};

const loginUserModel = async ({ emailId, password }) => {
  let users = [];
  try {
    users = await readJSON(usersFilePath);
  } catch (error) {
    users = [];
  }
  const user = users.find(
    (u) => u.emailId === emailId && u.password === password
  );
  return user || null;
};

module.exports = {
  registerUserModel,
  loginUserModel,
};
