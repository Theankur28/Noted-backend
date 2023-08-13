const express = require("express");
const cors = require("cors");
const port = process.env.PORT || 8000;
const dotenv = require("dotenv");

const app = express();
dotenv.config();

const mongoose = require("mongoose");
// Connecting to database
mongoose.connect(process.env.ATLAS_URI);
mongoose.connection.once("open", () => {
  console.log("Connected to the database!");
});

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
const NoteRouter = require("./routes/note-router");
const UserRouter = require("./routes/user-router");

app.use("/", NoteRouter);
app.use("/user", UserRouter);

// Listening to port
app.listen(port, () => {
  console.log("Server is running at", port);
});
