const express = require('express')
require('express-async-errors')
const app = express()
const cors = require('cors')
const blogListRouter = require('./controllers/blogList')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const { info, error } = require('./utils/logger')
const {tokenExtractor} = require('./utils/middleware')
app.use(cors())
app.use(express.json())
app.use(tokenExtractor)
app.use('/api/blogs', blogListRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)
// 测试
if (process.env.NODE_ENV === 'test') {
  const testingRouter = require('./controllers/testing')
  app.use('/api/testing', testingRouter)
}
const config = require('./utils/config')
const mongoose = require('mongoose')
const mongoUrl = config.MONGODB_URI
mongoose.connect(mongoUrl).then(() => {
  info('connect to mongodb success')
}).catch(error => error('connect error mesage:', error.message))

module.exports = app
