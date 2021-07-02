const express = require('express');

const app = express();

app.use((req, res, next) => {
  res.json({ message: "it is working" })
})

module.exports = app;
