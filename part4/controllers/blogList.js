const blogListRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const Blog = require('../models/blogList')
const User = require('../models/user')
const { userExtractor } = require('../utils/middleware')
// 获取token
// const getTokenFrom = request => {
//   const authorization = request.get('authorization')
//   if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
//     return authorization.substring(7)
//   }
//   return null
// }

blogListRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', {username: 1, name: 1})
  response.json(blogs)
})

blogListRouter.post('/', userExtractor, async (request, response) => {
  const { title, author, url, likes } = request.body
  // const token = getTokenFrom(request)
  // const decodedToken = jwt.verify(request.token, process.env.SECRET)
  // if (!decodedToken.id) {
  //   return response.status(401).json({ error: 'token missing or invalid' })
  // }
  // const user = await User.findById(decodedToken.id)
  const user = request.user
  const blog = new Blog({
    title,
    author,
    url,
    likes,
    user: user._id
  })

  if (request.body.title && request.body.url) {
    const saveBlog = await blog.save()
    response.json(saveBlog)
  } else {
    response.status(400).json({error:'Bad Request'})
  }
})

blogListRouter.delete('/:id', userExtractor, async (request, response) => {
  // 只有添加博客的用户才能删除博客
  // const decodedToken = jwt.verify(request.token, process.env.SECRET)
  // if (!decodedToken.id) {
  //   return response.status(401).json({error: 'token missing or invalid'})
  // }
  // const user = await User.findById(decodedToken.id)
  const user = request.user
  const blog = await Blog.findById(request.params.id)
  if (blog.user.toString() === user._id.toString()) {
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
  } else {
    response.status(401).json({error: 'this not you blog'})
  }
})

blogListRouter.put('/:id', async (request, response) => {
  const body = request.body

  console.log('back id', request.params.id)
  console.log('back body', JSON.stringify(body))
  const blog = {
    likes: body.likes
  }

  const updateBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {new: true})
  response.json(updateBlog)
})

module.exports = blogListRouter
