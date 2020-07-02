const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
  email: String,
  name: String,
  phone: String,
});

class Contact {
  constructor() {
    this.contact = mongoose.model("Contact", contactSchema);
  }

  getContacts = (contact) => {
    return this.contact.find(contact);
  };

  createContact = (contact) => {
    return this.contact.create(contact);
  };

  getUserById = (id) => {
    return this.contact.findById(id);
  };

  updateUser = (contact) => {
    const { id, ...contactModel } = contact;
    return this.contact.findByIdAndUpdate(contact.id, contactModel, {
      new: true,
    });
  };
}

module.exports = {
  Contact: new Contact(),
};
