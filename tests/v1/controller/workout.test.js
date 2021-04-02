const app = require('../../../application/v1/controller/index');
const request = require('supertest');

const API_KEY = '1ec23ee8-dc4f-454f-af00-74880b0271d1';

describe('/v1/workout', () => {
  it('Valid Get Workout by id', async () => {
    const res = await request(app).get("/v1/workout?id=1").set( { api_key: API_KEY });
    const expected = {
      id: '1',
      filming_datetime: '2021-03-29T07:35:25Z',
      filming_duration: 100,
      workout_name: 'test2',
      workout_status: 'PLANNING',
      workout_level: 'BEGINNER',
      trainer_id: '1',
      created: '2021-03-29T07:35:25Z',
      modified: '2021-04-02T22:23:51.361Z'
    }
    expect(JSON.stringify(res.body.workout)).toBe(JSON.stringify(expected));
  })

  it('Valid Get Workouts By Name', async () => {
    const res = await request(app).get("/v1/workout?name=test-workout-name-5").set( { api_key: API_KEY });
    expect(res.body.workouts.length).toBe(4);
  })

  it('Valid Get Workouts By Name Not Exists', async () => {
    const res = await request(app).get("/v1/workout?name=test-workout-name-not-exist").set( { api_key: API_KEY });
    expect(res.body.message).toBe('workouts by name does not exist');
  })
})
