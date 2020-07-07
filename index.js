const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");

const contactsRouter = require("./contacts/contacts.router");
const authRouter = require("./auth/auth.router");
const userRouter = require("./users/users.router");

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
    app.use("/auth", authRouter);
    app.use("/users", userRouter);
    app.use("/images", express.static("./static/images"));

    app.listen(PORT, () => {
      console.log(`Server is listening on ${PORT} port.`);
    });
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

runServer();
