const express = require("express");
const app = express();
const notesController = require("./notesController");
const path = require("path");
const PORT = process.env.PORT || 8000;

app.use(express.json());

app.use(express.static(path.join(__dirname, "./public")));

app.use(express.urlencoded({ extended: true }));

app.get("/", notesController.displayIndex);
app.get("/notes", notesController.displayNotes);
app.get("/api/notes", notesController.sendNotes);
app.post("/api/notes", notesController.addNote);
app.delete("/api/notes/:id", notesController.deleteNote);

app.listen(PORT, () => console.log(`Listening on PORT ::::localhost:${PORT}`));
