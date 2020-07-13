const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
  name: String,
  phone: Number,
  email: String,
});

class Contact {
  constructor() {
    this.contact = mongoose.model("Contact", contactSchema);
  }

  getContacts = () => {
    return this.contact.find();
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
