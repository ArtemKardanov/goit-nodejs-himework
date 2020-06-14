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
