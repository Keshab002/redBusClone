const express = require("express");
const {
  loginUserController,
  registerUserController,
} = require("../controllers/userController");

const router = express.Router();

router.post("/login", loginUserController);
router.post("/register", registerUserController);

module.exports = router;