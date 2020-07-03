const { Router } = require("express");
const tokenMiddleware = require("../middlewares/auth.middleware");
const { getCurrentUser } = require("./user.controller");

const userRouter = Router();

userRouter.get("/current", tokenMiddleware, getCurrentUser);

module.exports = userRouter;
