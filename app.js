const express = require('express');

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

app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>')
})

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

module.exports = app;
