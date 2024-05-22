const mongoose = require("mongoose");

const noteSchema = mongoose.Schema(
  {
    title: { type: String, required: true },
    body: { type: String, required: true },
    standard: { type: String, required: true },
    marks: { type: Number, required: true },
    user: { type: String, required: true }
  },
  {
    versionKey: false
  }
);

const NoteModel = mongoose.model("note", noteSchema);

module.exports = { NoteModel };

