
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const { contactsRouter } = require("./contacts/contacts.router");

const PORT = 3001;

const app = express();

app.use(cors());
app.use(morgan("combined"));
app.use(express.json());
app.use("/contacts", contactsRouter);

app.listen(PORT, () => {
  console.log(`Server is listening on ${PORT} port.`);
});
=======
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

