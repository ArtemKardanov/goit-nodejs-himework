const { Contact } = require("../contacts/contacts.model");
const { LoginValidation } = require("./auth.validator");
const { createToken } = require("../services/auth.service");
const bcrypt = require("bcrypt");
const { salt } = require("../config");

const registrationController = async (req, res) => {
  try {
    const { errors } = await LoginValidation.validate(req.body);

    if (errors) {
      res.status(400).send(errors);
      return;
    }

    const { email, password } = req.body;
    const emailExist = await Contact.getContacts({ email });

    if (emailExist) {
      res.status(409).send("Email in use");
      return;
    } else {
      const hashPassword = await bcrypt.hash(password, salt);
      const contact = { ...req.body, password: hashPassword };

      await Contact.createContact(contact);

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
    const contactExist = await Contact.getContacts({ email });

    if (!contactExist) {
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

    const token = await createToken({ id: user._id });

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

module.exports = {
  registrationController,
  loginController,
};
