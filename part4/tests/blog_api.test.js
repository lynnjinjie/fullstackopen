const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blogList')
beforeEach(async () => {
  await Blog.deleteMany({})
  const blogObjects = helper.initalBlogs.map(blog => new Blog(blog))
  const promiseBlogsArray = blogObjects.map(blog => blog.save())
  return Promise.all(promiseBlogsArray)
}, 100*1000)

test('blogs are return as a json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('blogs is name id', async () => {
  const result = await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
    const isHaveId = result.body[0].id
  expect(isHaveId).toBeDefined()
})

test('a valid blogs can be added', async () => {
  const blog = {
    title: "async/await test",
    author: "both",
    url: 'https://blog.me/post/3',
    likes: 4
  }

  await api
    .post('/api/blogs')
    .send(blog)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const blogAtEnd = await helper.BlogsInDb()
  expect(blogAtEnd).toHaveLength(helper.initalBlogs.length + 1)
})

test('blogs like default 0', async () => {
  const blog = {
    title: "async/await test",
    author: "both2",
    url: 'https://blog.me/post/3'
  }

  await api
    .post('/api/blogs')
    .send(blog)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const blogAtEnd = await helper.BlogsInDb()
  const content = blogAtEnd.find(blog => blog.author === 'both2')
  expect(content.likes).toBe(0)
})

test('blogs status 400 when lose title and url', async () => {
  const blog = {
    author: "both2",
  }

  await api
    .post('/api/blogs')
    .send(blog)
    .expect(400)
})


afterAll(() => {
  mongoose.connection.close()
})
