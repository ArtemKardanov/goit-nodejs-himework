const fs = require("fs");
const path = require("path");
const util = require("util");
const shortid = require("shortid");

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

const contactsPath = path.join(__dirname, "../db/contacts.json");

exports.listContacts = async () => {
  try {
    const data = await readFile(contactsPath, "utf8");
    const contacts = JSON.parse(data);

    return contacts;
  } catch (error) {
    console.log(error);
  }
};

exports.getContactById = async (contactId) => {
  try {
    const data = await readFile(contactsPath, "utf8");
    const contacts = JSON.parse(data);

    return contacts.find((contact) => contact.id === contactId);
  } catch (error) {
    console.log(error);
  }
};

exports.removeContact = async (contactId) => {
  try {
    const data = await readFile(contactsPath, "utf8");
    const contacts = JSON.parse(data);

    const updatedContactsList = contacts.filter(
      (contact) => contact.id !== contactId
    );

    await writeFile(contactsPath, JSON.stringify(updatedContactsList));

    return updatedContactsList;
  } catch (error) {
    console.log(error);
  }
};

exports.addContact = async ({ name, email, phone }) => {
  try {
    const data = await readFile(contactsPath, "utf8");
    const contacts = JSON.parse(data);

    const newContact = {
      id: shortid.generate(),
      name: name,
      email: email,
      phone: phone,
    };

    const newContactsList = [...contacts, newContact];

    await writeFile(contactsPath, JSON.stringify(newContactsList));

    return newContact;
  } catch (error) {
    console.log(error);
  }
};

exports.updateContact = async (id, updates) => {
  const data = await readFile(contactsPath, "utf8");
  const contacts = JSON.parse(data);

  const contact = contacts.find((contact) => contact.id === id);

  const updatedContact = {
    id: contact.id,
    ...updates,
  };

  return updatedContact;
};
