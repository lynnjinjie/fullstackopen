const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blogList')
beforeEach(async () => {
  await Blog.deleteMany({})
  // const blogObjects = helper.initalBlogs.map(blog => new Blog(blog))
  // const promiseBlogsArray = blogObjects.map(blog => blog.save())
  // return Promise.all(promiseBlogsArray)
  await Blog.insertMany(helper.initalBlogs)
}, 100*1000)

describe('when there is initially some blogs saved', () => {
  test('blogs are return as a json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

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

test('a blog can be delete', async () => {
  const blogAtStart = await helper.BlogsInDb()
  const blogDelete = blogAtStart[0]
  // console.log('blog', blogAtStart)
  await api
    .delete(`/api/blogs/${blogDelete.id}`)
    .expect(204)

  const blogAtEnd = await helper.BlogsInDb()
  expect(blogAtEnd).toHaveLength(helper.initalBlogs.length - 1)
})

test('a blog like can be update', async () => {
  const blogAtStart = await helper.BlogsInDb()
  const blogUpdate = blogAtStart[0]
  const blog = {
    likes: 100
  }
  await api
    .put(`/api/blogs/${blogUpdate.id}`)
    .send(blog)
    .expect(200)

  const blogAtEnd = await helper.BlogsInDb()
  const updatedBlog = blogAtEnd.find(item => item.id === blogUpdate.id)
  expect(updatedBlog.likes).toBe(100)
})

afterAll(() => {
  mongoose.connection.close()
})
