const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

// 获取所有用户
usersRouter.get('/', async (request, response) => {
  // join notes
  const users = await User.find({}).populate('blogs' ,{ content: 1, date: 1 })
  response.json(users)
})

usersRouter.post('/', async (request, response) => {
  const body = request.body
  if (body.password.length < 3) {
    response.status(401).json({error: 'password must have 3'})
    return
  }
  const saltRounds = 10
  const passwordHash = await bcrypt.hash(body.password, saltRounds)

  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash
  })

  const savedUser = await user.save()
  response.json(savedUser)
})

module.exports = usersRouter
