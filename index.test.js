const app = require('./index')
const request = require('supertest')

describe('/', () => {
  it('responds with Hello World', async () => {
    const res = await request(app).get("/");

    expect(res.text).toBe('Hello World')
  })
})
