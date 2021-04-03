const app = require('../../../application/v1/controller/index');
const request = require('supertest');

const API_KEY = '1ec23ee8-dc4f-454f-af00-74880b0271d1';

describe('/v1/trainer', () => {
  it('Valid Get Trainer by id', async () => {
    const res = await request(app).get("/v1/trainer?id=1").set( { api_key: API_KEY });
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

    expect(res.body.trainer.id).toBe('1');
    expect(res.body.trainer.workouts.length).toBe(6);
  })

  it('Invalid Get Trainer by id', async () => {
    const res = await request(app).get("/v1/trainer?id=invalid").set( { api_key: API_KEY });

    expect(res.body.message).toBe('trainer by id does not exist');
  })
})
