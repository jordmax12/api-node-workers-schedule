const express = require('express')
const app = express()
const { getTrainerById } = require('./trainer');
const { getWorkoutById } = require('./workout');
 
app.get('/', function (req, res) {
  res.send('Hello World')
})

app.get('/v1/workout', (req, res) => {
  getWorkoutById(req, res);
})

app.get('/v1/trainer', (req, res) => {
  getTrainerById(req, res);
})

module.exports = app;
