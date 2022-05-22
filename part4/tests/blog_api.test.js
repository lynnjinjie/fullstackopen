const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blogList')
const User = require('../models/user')
const bcrypt = require('bcrypt')
let token
beforeEach(async () => {
  await Blog.deleteMany({})
  // const blogObjects = helper.initalBlogs.map(blog => new Blog(blog))
  // const promiseBlogsArray = blogObjects.map(blog => blog.save())
  // return Promise.all(promiseBlogsArray)
  // await Blog.insertMany(helper.initalBlogs)
  await User.deleteMany({})

    const passwordHash = await bcrypt.hash('1234', 10)
    const user = new User({ username: 'admin',name: 'admin', passwordHash })
    const saveUser = await user.save()
    const loginForm = {
      username: saveUser.username,
      password: '1234'
    }
    // 登录获取token
    const loginResult = await api.post('/api/login').send(loginForm)
    token = JSON.parse(loginResult.text).token
    for(let blog of helper.initalBlogs) {
      blog.user = saveUser._id
      let blogObject = new Blog(blog)
      await blogObject.save()
    }
}, 100*1000)

describe('when there is initially some blogs saved', () => {
  test('blogs are return as a json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

})

test('a valid blogs not token', async () => {
  const blog = {
    title: "async/await test",
    author: "both",
    url: 'https://blog.me/post/3',
    likes: 4
  } 

  const result = await api
    .post('/api/blogs')
    .send(blog)
    .expect(401)
    .expect('Content-Type', /application\/json/)

  expect(result.body.error).toContain('token is missing')
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
    .set('Authorization', `bearer ${token}`)
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
    .set('Authorization', `bearer ${token}`)
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
    .set('Authorization', `bearer ${token}`)
    .send(blog)
    .expect(400)
})

test('a blog can be delete', async () => {
  const blogAtStart = await helper.BlogsInDb()
  const blogDelete = blogAtStart[0]
  // console.log('blog', blogAtStart)
  await api
    .delete(`/api/blogs/${blogDelete.id}`)
    .set('Authorization', `bearer ${token}`)
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
    .set('Authorization', `bearer ${token}`)
    .send(blog)
    .expect(200)

  const blogAtEnd = await helper.BlogsInDb()
  const updatedBlog = blogAtEnd.find(item => item.id === blogUpdate.id)
  expect(updatedBlog.likes).toBe(100)
})

afterAll(() => {
  mongoose.connection.close()
})
