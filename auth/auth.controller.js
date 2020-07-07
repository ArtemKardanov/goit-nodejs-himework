const { User } = require("../users/users.model");
const { LoginValidation } = require("./auth.validator");
const { createToken } = require("../services/auth.service");
const bcrypt = require("bcrypt");
const { avatarToGenerate } = require("../services/avatar.generator");
const { salt } = require("../config");

const registrationController = async (req, res) => {
  try {
    const { errors } = await LoginValidation.validate(req.body);

    if (errors) {
      res.status(400).send(errors);
      return;
    }

    const { email, password } = req.body;
    const emailExist = await User.getUsers({ email });

    if (emailExist) {
      res.status(409).send("Email in use");
      return;
    } else {
      const hashPassword = await bcrypt.hash(password, salt);
      const avatarURL = avatarToGenerate(req);
      const user = { ...req.body, password: hashPassword, avatarURL };

      await User.createUser(user);

      res.status(201).json({
        user: {
          email,
          subscription: "free",
        },
      });
    }
  } catch (error) {
    res.status(500).send("Inrernal server error");
  }
};

const loginController = async (req, res) => {
  try {
    const { errors } = await LoginValidation.validate(req.body);
    if (errors) {
      res.status(400).send(errors);
      return;
    }

    const { email, password } = req.body;
    const userExist = await User.getUsers({ email });

    if (!userExist) {
      res.status(401).send("Email is wrong");
      return;
    }

    const isValidPaswword = await bcrypt.compare(
      password,
      contactExist.password
    );

    if (!isValidPaswword) {
      res.status(401).send("Password is wrong");
      return;
    }

    const token = await createToken(user._id);

    res.status(200).json({
      token,
      user: {
        email,
        subscription: "free",
      },
    });
  } catch (error) {
    res.status(500).send("Inrernal server error");
  }
};

const logoutController = async (req, res) => {
  try {
    const user = req.user;

    if (!user) {
      res.status(401).send("Not authorized");
      return;
    }
    await User.updateToken(user._id, null);

    res.status(204).send("No content");
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  registrationController: registrationController,
  loginController: loginController,
  logoutController: logoutController,
};
