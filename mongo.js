const mongoose = require('mongoose');

const url = 'mongodb://localhost:27017/test';

mongoose.connect(url, {
  useUrlNewParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
})

const noteSchema = mongoose.Schema({
  content: String,
  date: Date,
  important: Boolean
})

const Note = mongoose.model('Note', noteSchema);

// Create new note
//const note = new Note({
//  content: "new note",
//  date: new Date(),
//  important: Math.random() ? 'true' : 'false'
//})
//note.save()
//  .then(result => {
//    console.log(result);
//    mongoose.connection.close();
//  })
//
//  Fetch all notes
//Note.find({})
//  .then(result => {
//    result.forEach(note => {
//      console.log(note) 
//    }) 
//    mongoose.connection.close();
//  })
//
//  Fetch important notes only
Note.find({ important: true})
  .then(result => {
    result.forEach(note => {
      console.log(note)
    })
    mongoose.connection.close();
  })
