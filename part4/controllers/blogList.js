const blogListRouter = require('express').Router()
const Blog = require('../models/blogList')
blogListRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogListRouter.post('/', async (request, response) => {
  const blog = new Blog(request.body)
  if (request.body.title && request.body.url) {
    const saveBlog = await blog.save()
    response.json(saveBlog)
  } else {
    response.status(400).json({error:'Bad Request'})
  }
})


module.exports = blogListRouter
