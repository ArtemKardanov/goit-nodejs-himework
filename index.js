
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");

const { contactsRouter } = require("./contacts/contacts.router");

const PORT = 3002;

const runServer = async () => {
  const app = express();

  try {
    await mongoose.connect(
      "mongodb+srv://root:root@cluster0-2e5dx.mongodb.net/db-contacts?retryWrites=true&w=majority",
      {
        useUnifiedTopology: true,
        useNewUrlParser: true,
      }
    );

    console.log("Database connection successful");

    app.use(cors());
    app.use(morgan("combined"));
    app.use(express.json());
    app.use("/contacts", contactsRouter);

    app.listen(PORT, () => {
      console.log(`Server is listening on ${PORT} port.`);
    });
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

runServer();

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

