const jwt = require('jsonwebtoken')
const User = require('../models/user')
// 获取当前的token
const tokenExtractor = (request, response, next) => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    request.token = authorization.substring(7)
  } else {
    request.token = null
  }
  next()
}
// 获取当前用户
const userExtractor = async (request, response, next) => {
  if (!request.token) {
    return response.status(401).json({error: 'token is missing'})
  }
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({error: 'token missing or invalid'})
  }
  const user = await User.findById(decodedToken.id)
  if(user._id) {
    request.user = user
  } else {
    request.user = null
  }
  next()
}

module.exports = {
  tokenExtractor,
  userExtractor
}
