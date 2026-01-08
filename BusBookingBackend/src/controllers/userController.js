const {
  registerUserService,
  loginUserService,
} = require("../services/userService");

const registerUserController = async (req, res) => {
  const { userName, password, fullName, emailId } = req.body;
  if (!userName || !password || !fullName || !emailId) {
    return res.status(400).json({ message: "All fields are required" });
  }
  const existingUser = await loginUserService({ userName, password });
  if (existingUser) {
    return res.status(409).json({ message: "User already exists" });
  }
  const userData = await registerUserService({
    userName,
    password,
    fullName,
    emailId,
    ...req.body,
  });
  res
    .status(201)
    .json({ data: userData, message: "User registered successfully" });
};

const loginUserController = async (req, res) => {
  const { emailId, password } = req.body;
  if (!emailId || !password) {
    return res
      .status(400)
      .json({ message: "Email ID and password are required" });
  }

  const userData = await loginUserService({ emailId, password });
  if (!userData) {
    return res.status(401).json({ message: "Invalid credentials! Please Register First" });
  }

  res.status(200).json({ message: "Login successful", data: userData });
};

module.exports = {
  registerUserController,
  loginUserController,
};
