const path = require("path");
const fs = require("fs");

module.exports = {
  displayIndex: (req, res) => {
    res.sendFile(path.join(__dirname, "./public/index.html"));
  },
  displayNotes: (req, res) => {
    res.sendFile(path.join(__dirname, "./public/notes.html"));
  },
  sendNotes: (req, res) => {
    fs.readFile(path.join(__dirname, "./db/db.json"), (err, notes) => {
      if (err) throw err;
      res.send(JSON.parse(notes));
    });
  },
  addNote: (req, res) => {
    const notes = JSON.parse(
      fs.readFileSync(path.join(__dirname, "./db/db.json"))
    );

    let id = () => {
      if (notes.length === 0) {
        return 0;
      } else {
        let setId = notes[notes.length - 1].id;
        setId++;
        return setId;
      }
    };

    const newNote = req.body;

    newNote.id = id();

    notes.push(newNote);
    const noteStringify = JSON.stringify(notes);

    fs.writeFile("./db/db.json", noteStringify, (err) => {
      if (err) throw err;
    });
    res.send(noteStringify);
  },
  deleteNote: (req, res) => {
    const id = req.params.id;
    const notes = JSON.parse(
      fs.readFileSync(path.join(__dirname, "db/db.json"))
    );
    const removedNote = notes.filter((note) => note.id !== parseInt(id));
    const finalNote = JSON.stringify(removedNote);
    fs.writeFile("db/db.json", finalNote, (err) => {
      if (err) throw err;
    });

    res.send(finalNote);
  },
};
