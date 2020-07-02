const { Router } = require("express");
const tokenMiddleware = require("../middlewares/auth.middleware");
const {
  registrationController,
  loginController,
  logoutController,
} = require("./auth.controller");
const LoginValidation = require("./auth.validator");

const authRouter = Router();

authRouter.post("/register", registrationController);
authRouter.post("/login", loginController);
authRouter.post("/logout", tokenMiddleware, logoutController);

module.exports = authRouter;
