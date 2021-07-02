const express = require('express');

const app = express();

const notes = [
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

module.exports = app;
