const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const superTest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = superTest(app)
const User = require('../models/user')
describe('when there is initially one user in db', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()
  }, 100000)

  test('password is must 3', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'amy',
      name: 'rabin mi',
      password: '12'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(401)
      .expect('Content-Type', /application\/json/)
  })

  test('username is more 3', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'te',
      name: 'Superuser',
      password: 'salainen',
    }
    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(500)
  })

  afterAll(() => {
    mongoose.connection.close()
  })
})
