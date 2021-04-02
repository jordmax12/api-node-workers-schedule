const express = require('express')
const app = express()
const { getTrainerById } = require('./trainer');
const { authenicate_api_key } = require('./middleware');
const { getWorkoutHandler, postWorkout, patchWorkout } = require('./workout');

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

app.get('/v1/workout', authenicate_api_key, async (req, res) => {
  return getWorkoutHandler(req, res);
})

app.post('/v1/workout', authenicate_api_key, async (req, res) => {
  return postWorkout(req, res);
})

app.patch('/v1/workout', authenicate_api_key, async (req, res) => {
  return patchWorkout(req, res);
})

app.get('/v1/trainer', authenicate_api_key, async (req, res) => {
  return getTrainerById(req, res);
})

module.exports = app;
