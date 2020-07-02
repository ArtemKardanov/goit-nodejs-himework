const { Router } = require("express");
const { contactValidateMiddleware } = require("../contacts/contact.validator");
const {
  registrationController,
  loginController,
} = require("./auth.controller");

const authRouter = Router();

authRouter.post("/register", registrationController);
authRouter.post("/login", loginController);
authRouter.post("/logout");

module.exports = {
  authRouter,
};
