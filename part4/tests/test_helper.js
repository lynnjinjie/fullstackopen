const Blog  = require('../models/blogList')
const User = require('../models/user')
const initalBlogs =[ 
  {
    title: "where am I",
    author: "You",
    url: 'https://blog.me/post/2',
    likes: 10
  }
]

const BlogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}
const usersInDb = async () => {
  const users = await User.find({})
  return users.map(user => user.toJSON())
}

module.exports = {
  initalBlogs,
  BlogsInDb,
  usersInDb
}
