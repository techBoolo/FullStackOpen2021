const express = require('express');
require('dotenv').config();
const cors = require('cors');
const Note = require('./models/note');
const mongoose = require('mongoose');

const app = express();

// logger middleware
const reqLogger = (req, res, next) => {
  console.log("Method:", req.method);
  console.log("Path:", req.path);
  console.log("Body:", req.body);
  console.log("---");
  next();
}

// handle unknown url/endpoint
const unknownEndPoint = (req, res, next) => {
  res.status(404).send({ error: "unknown endpoint"})
}

app.use(cors());
app.use(express.json());
app.use(express.static('build'));
app.use(reqLogger);

app.get('/api/notes', (req, res) => {
  Note.find({}).then(notes => {
    res.json(notes);
  })
})

app.get('/api/notes/:id', (req, res) => {
  const id = req.params.id;
  Note.find({_id: new mongoose.Types.ObjectId(id)})
    .then(note => {
      res.json(note);
    })
    .catch(error => {
      res.status(404).end();
    })
})

app.delete('/api/notes/:id', (req, res) => {
  const id = req.params.id;
  Note.deleteOne({_id: new mongoose.Types.ObjectId(id)})
    .then(result => {
      res.status(204).send(result);
    })
    .catch(error => {
      res.status(404).end(error);    
    })
})

app.post('/api/notes', (req, res) => {
  const body = req.body;
  if(!body.content) {
    return res.status(400).json({
      error: "Content missing"
    })
  }
  const note = new Note({
    content: body.content,
    important: body.important || false,
    date: new Date(),
  })
  note.save()
    .then(result => {
      res.json(note);
    })
    .catch(error => {
      res.status(400).end() 
    })
})

app.use(unknownEndPoint);

module.exports = app;
