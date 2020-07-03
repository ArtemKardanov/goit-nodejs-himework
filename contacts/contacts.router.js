const express = require("express");

const {
  getContactsController,
  getContactByidController,
  createContactController,
  deleteContactController,
  updateUserController,
} = require("./contacts.controller");
const { contactValidateMiddleware } = require("./contact.validator");

const contactsRouter = express.Router();

contactsRouter.get("/", getContactsController);
contactsRouter.get("/:contactId", getContactByidController);
contactsRouter.post("/", contactValidateMiddleware, createContactController);
contactsRouter.delete("/:contactId", deleteContactController);
contactsRouter.patch("/:contactId", updateUserController);

module.exports.contactsRouter = contactsRouter;
