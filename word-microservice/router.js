const express = require('express');
const {getWords} = require('./controllers');
const app = express();
const cors = require('cors');

app.use(cors());
app.get('/words', (req, res) => {
  getWords(req, res);
});

module.exports = app;