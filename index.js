const argv = require("yargs").argv;
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
} = require("./contacts.js");

console.log(listContacts());

function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      listContacts().then((data) => console.table(data));

      break;

    case "get":
      getContactById(id).then((data) => console.log(data));

      break;

    case "add":
      addContact(name, email, phone).then((data) => console.log(data)).break;

    case "remove":
      removeContact(id).then((data) => console.log(data));

      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
