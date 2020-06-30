const { Router } = require("express");
const { contactValidateMiddleware } = require("../contacts/contact.validator");
const {
  registrationController,
  loginController,
} = require("./auth.controller");

const authRouter = Router();

authRouter.post("/register", contactValidateMiddleware, registrationController);
authRouter.post("/login", loginController);

module.exports = {
  authRouter,
};
