const mongoose = require('mongoose');

const dbUrl = process.env.MONGODB_URI;

console.log("connecting to db", dbUrl)

mongoose.connect(dbUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
})
.then(result => {
  console.log("connected to db")
})
.catch(error => {
  console.log("error connecting to db", error.message)
})


const noteSchema = mongoose.Schema({
  content: String,
  date: Date,
  important: Boolean
})

noteSchema.set('toJSON', {
  transform: (doc, obj) => {
    obj.id = obj._id.toString();
    delete obj._id;
    delete obj.__v;
  }
})

module.exports = mongoose.model('Note', noteSchema);
