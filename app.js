const express = require('express');

const app = express();
const people = [
  {
    "id": 1,
    "name": "Arto Hellas",
    "number": "045- 234342"
  },
  {
    "id": 2,
    "name": "Ada Lovelace",
    "number": "23-45-299342"
  },
  {
    "id": 3,
    "name": "Dan Abramov",
    "number": "12-01-014942"
  },
  {
    "id": 4,
    "name": "Mary Poppen",
    "number": "39-01-853589"
  }
]

app.use('/api/people', (req, res, next) => {
  res.json(people)
})

module.exports = app;
