const express = require('express');

const app = express();
let people = [
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

app.get('/info', (req, res, next) => {
  res.send(`<div>
        <p>Phonebook has info for ${people.length} people</p>
        <p>${new Date()}</p>
      </div>`
    )
})

app.get('/api/people', (req, res, next) => {
  res.json(people)
})

app.get('/api/people/:id', (req, res, next) => {
  const id = req.params.id;
  const person = people.find(p => p.id === Number(id));
  if(!person) {
    return res.status(404).end(); 
  }
  res.json(person)
})

app.delete('/api/people/:id', (req, res, next) => {
  const id = Number(req.params.id);
  people = people.filter(p => p.id !== id);
  res.status(204).end();
})

module.exports = app;
