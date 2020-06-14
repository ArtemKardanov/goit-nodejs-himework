const { Contact } = require("./contacts.model");

exports.getContactsController = async (req, res) => {
  try {
    const contacts = await Contact.getContacts();
    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).send("Bad request");
  }
};

exports.getContactByidController = async (req, res) => {
  const { contactId } = req.params;

  try {
    const contacts = await Contact.getContacts();
    const isIdExist = contacts.find((contact) => contact.id === contactId);

    if (isIdExist) {
      const contact = await Contact.getUserById(contactId);
      res.status(200).json(contact);
    } else {
      res.status(404).send("Not found");
    }
  } catch (error) {
    console.log(error);
  }
};

exports.createContactController = async (req, res) => {
  try {
    const createdContact = await Contact.createContact(req.body);
    res.status(201).json(createdContact);
  } catch (error) {
    console.log(error);
    res.status(500).send("server error");
  }
};

exports.deleteContactController = async (req, res) => {
  const { contactId } = req.params;
  try {
    const contacts = await listContacts();
    const isIdExist = contacts.find((contact) => contact.id === contactId);
    if (isIdExist) {
      await removeContact(req.params.contactId);
      res.status(200).send("Contact deleted");
    } else {
      res.status(404).send("not found");
    }
  } catch (error) {
    console.log(error);
  }
};

exports.updateUserController = async (req, res) => {
  try {
    if (Object.keys(req.body).length === 0) {
      return res.status(400).json("missing fields");
    }
    const updatedContact = await Contact.updateUser(req.body);
    if (!updatedContact) {
      res.status(404).json("Not found");
    }
    res.status(200).json(updatedContact);
  } catch (error) {
    console.log(error);
  }
};
