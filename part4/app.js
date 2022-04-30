const express = require('express')
require('express-async-errors')
const app = express()
const cors = require('cors')
const blogListRouter = require('./controllers/blogList')
const { info, error } = require('./utils/logger')
app.use(cors())
app.use(express.json())
app.use('/api/blogs', blogListRouter)
const config = require('./utils/config')
const mongoose = require('mongoose')
const mongoUrl = config.MONGODB_URI
mongoose.connect(mongoUrl).then(() => {
  info('connect to mongodb success')
}).catch(error => error('connect error mesage:', error.message))

module.exports = app
