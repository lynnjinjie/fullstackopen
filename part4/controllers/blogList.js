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

blogListRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

blogListRouter.put('/:id', async (request, response) => {
  const body = request.body

  const blog = {
    likes: body.likes
  }

  const updateBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {new: true})
  response.json(updateBlog)
})

module.exports = blogListRouter
