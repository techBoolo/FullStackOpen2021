const express = require('express');
const cors = require('cors');

const app = express();

let notes = [
  {
    id: 1,
    content: "html is easy",
    date: new Date(),
    important: true
  },
  {
    id: 2,
    content: "Browser execute js",
    date: new Date(),
    important: false
  },
  {
    id: 3,
    content: "GET and POST are methods of HTTP protocol",
    date: new Date(),
    important: true
  }
]

const reqLogger = (req, res, next) => {
  console.log("Method:", req.method);
  console.log("Path:", req.path);
  console.log("Body:", req.body);
  console.log("---");
  next();
}

const unknownEndPoint = (req, res, next) => {
  res.status(404).send({ error: "unknown endpoint"})
}

app.use(cors());
app.use(express.json());
app.use(express.static('build'));
app.use(reqLogger);

app.get('/api/notes', (req, res) => {
  res.json(notes);
})

app.get('/api/notes/:id', (req, res) => {
  const id = req.params.id;
  const note = notes.find(note => note.id === Number(id));
  if(note) {
    res.json(note);
  } else {
    res.status(404).end();
  }
})

app.delete('/api/notes/:id', (req, res) => {
  const id = req.params.id;
  notes = notes.filter(note => note.id !== Number(id));

  res.status(204).end();
})

const generateId = () => {
  const maxId = notes.length > 0
    ? Math.max(...notes.map(n => n.id))
    : 0

    return maxId + 1;
}
app.post('/api/notes', (req, res) => {

  const body = req.body;
  if(!body.content) {
    return res.status(400).json({
      error: "Content missing"
    })
  }

  const note = {
    content: body.content,
    important: body.important || false,
    date: new Date(),
    id: generateId()
  }
  notes = [...notes, note ]
  res.json(note);
})

app.use(unknownEndPoint);

module.exports = app;
