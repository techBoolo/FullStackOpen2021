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
  const error = new Error("Route not found");
  error.statusCode = 404;
  next(error);
}
// error handler
const errorHandler = (error, req, res, next) => {
  res.statusCode = error.statusCode || 500
  console.error(error.message);
  res.json({ error : { message: error.message}});
}

app.use(cors());
app.use(express.json());
app.use(express.static('build'));
app.use(reqLogger);

app.get('/api/notes', (req, res, next) => {
  Note.find({})
    .then(notes => {
      res.json(notes);
    })
    .catch(error => next(error))
})

app.get('/api/notes/:id', (req, res, next) => {
  const id = req.params.id;
  Note.find({_id: new mongoose.Types.ObjectId(id)})
    .then(note => {
      if(note){
        res.json(note);
      }else {
        res.status(404).end()
      }
    })
    .catch(error => next(error))
})

app.delete('/api/notes/:id', (req, res, next) => {
  const id = req.params.id;
  Note.deleteOne({_id: new mongoose.Types.ObjectId(id)})
    .then(result => {
      res.json(result);
    })
    .catch(error => next(error))
})

app.post('/api/notes', (req, res, next) => {
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
    .catch(error => next(error))
})

app.put('/api/notes/:id', (req, res, next) => {
  const id = req.params.id;
  const body = req.body;
  const note = {
    important: body.important 
  }
  Note.findOneAndUpdate({_id: new mongoose.Types.ObjectId(id)},{ $set: note}, {returnOriginal: false} )
    .then(response => {
      res.json(response) 
    })
    .catch(error => next(error))
})

app.use(unknownEndPoint);
app.use(errorHandler);

module.exports = app;
