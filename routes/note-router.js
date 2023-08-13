// notes-router.js

const express = require("express");
const router = express.Router();
const Note = require("../models/note-model");
const authMiddleware = require("../middlewares/auth");

router
  .route("/note")
  .get(authMiddleware, async (req, res) => {
    try {
      // Fetch notes from the database based on the userId
      const notes = await Note.find({ userId: req.user });
      res.json(notes);
    } catch (error) {
      res.status(500).json("Error", error);
    }
  })
  .post(authMiddleware, (req, res) => {
    let newNote = new Note({
      title: req.body.title,
      content: req.body.content,
      userId: req.body.userId,
    });
    newNote
      .save()
      .then(() => res.status(200).json({ message: "New Note Added!" }))
      .catch((err) =>
        res
          .status(400)
          .json({ message: "Error in adding the note", error: err })
      );
  });

router
  .route("/note/:Id")
  .put(authMiddleware, (req, res) => {
    Note.findByIdAndUpdate(req.params.Id).then((note) => {
      note.title = req.body.title;
      note.content = req.body.content;
      note
        .save()
        .then(() => res.json({ message: "Successfully updated!" }))
        .catch((err) =>
          res.status(400).json({ message: "Error in updating!", error: err })
        );
    });
  })
  .delete(authMiddleware, (req, res) => {
    Note.findByIdAndDelete(req.params.Id)
      .then(() => {
        res.status(200).json({ message: "Successfully Deleted!" });
      })
      .catch((err) =>
        res
          .status(400)
          .json({ message: "Error in fetching the notes", error: err })
      );
  });

module.exports = router;
