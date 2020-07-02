const express = require("express");

const {
  getContactsController,
  getContactByidController,
  createContactController,
  deleteContactController,
  updateUserController,
} = require("./contacts.controller");

const { tokenMiddleware } = require("../middlewares/auth.middleware");

const { contactValidateMiddleware } = require("./contact.validator");

const contactsRouter = express.Router();

contactsRouter.get("/", tokenMiddleware, getContactsController);
contactsRouter.get("/:contactId", tokenMiddleware, getContactByidController);
contactsRouter.post(
  "/",
  tokenMiddleware,
  contactValidateMiddleware,
  createContactController
);
contactsRouter.delete("/:contactId", tokenMiddleware, deleteContactController);
contactsRouter.patch("/:contactId", tokenMiddleware, updateUserController);

module.exports.contactsRouter = contactsRouter;
