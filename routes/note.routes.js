const express = require("express");
const jwt = require("jsonwebtoken");
const { authenticator } = require("../middlewares/authenticator");
const { NoteModel } = require("../models/NoteModel");

const noteRouter = express.Router();
noteRouter.use(authenticator);

noteRouter.get("/", async (req, res) => {
  try {
    const data = await NoteModel.find({ user: req.body.user });
    res.send({
      data: data,
      message: "success",
      status: 1
    });
  } catch (error) {
    res.send({
      message: error.message,
      status: 0
    });
  }
});

noteRouter.post("/create", async (req, res) => {
  try {
    let note = new NoteModel(req.body);
    await note.save();
    res.send({
      message: "Note created",
      status: 1
    });
  } catch (error) {
    res.send({
      message: error.message,
      status: 0
    });
  }
});

noteRouter.patch("/:id", async (req, res) => {
  const noteId = req.params.id;
  try {
    await NoteModel.findByIdAndUpdate(noteId, req.body);
    res.send({
      message: "Note updated",
      status: 1
    });
  } catch (error) {
    res.send({
      message: error.message,
      status: 0
    });
  }
});

noteRouter.delete("/:id", async (req, res) => {
  const noteId = req.params.id;
  try {
    await NoteModel.findByIdAndDelete(noteId);
    res.send({
      message: "Note deleted",
      status: 1
    });
  } catch (error) {
    res.send({
      message: error.message,
      status: 0
    });
  }
});

module.exports = { noteRouter };
