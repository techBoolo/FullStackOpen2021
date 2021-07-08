const express = require('express');
const logger = require('morgan');
const cors = require('cors');

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


app.use(cors());
app.use(express.json());
app.use(express.static('build'));

logger.token('data', (req, res) => {
  return JSON.stringify(req.body)
})

app.use(logger((tokens, req, res) => {
 return [
   tokens.method(req, res),
   tokens.url(req, res),
   tokens.status(req, res),
   tokens.res(req, res, 'content-length'), '- ',
   tokens['response-time'](req, res),  'ms',
   tokens.data(req, res)
  ].join(' ')
}))

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

app.post('/api/people', (req, res, next) => {
  const body = req.body;
  if(!body.name || !body.number) {
    return res.status(400).json({ error: "provide name and number" })
  } 

  let person = people.find(p => p.name.toLowerCase() === body.name.toLowerCase());
  if(person) {
    return res.status(400).json({ error: "must be unique" })
  }

  person = {
    name: body.name,
    number: body.number,
    id: Math.floor(Math.random()*100000) + 1
  }
  people = [ ...people, person ];
  res.status(201).json(person)
})

module.exports = app;
