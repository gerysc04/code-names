const express = require('express');
const {getLobby, getUser} = require('./controllers');
const app = express();
const cors = require('cors');

app.use(cors());
app.get('/lobby/:id', (req, res) => {
  getLobby(req, res);
});
app.get('/user/:id', (req, res) => {
  getLobby(res, req);
});

module.exports = app;