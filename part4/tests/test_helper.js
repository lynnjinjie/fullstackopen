const Blog  = require('../models/blogList')

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

module.exports = {
  initalBlogs,
  BlogsInDb
}
