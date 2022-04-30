const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    // required: true,
  },
  author: String,
  url: {
    type: String,
    // required: true
  },
  likes: {
    type: Number,
    default: 0
  }
})

blogSchema.set('toJSON', {
  transform: (doucument, returnObject) => {
    returnObject.id = returnObject._id.toString()
    delete returnObject._id
  }
})

module.exports = mongoose.model('Blog', blogSchema)
