const _ = require('lodash')
const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => {
    return sum + blog.likes
  }, 0)
}

const favoriteBlog = (blogs) => {
  const likes = []
  blogs.map(blog => {
    likes.push(blog.likes)
  })
  const maxLike = blogs.find(blog => blog.likes === Math.max(...likes))
  // console.log('maxLike', maxLike);
  return {
    title: maxLike.title,
    author: maxLike.author,
    likes: maxLike.likes
  }
}

const mostBlog = (blogs) => {
  const item = (a) => a.author
  const countByBlog = _.countBy(blogs, item)
  const maxBlog = {}
  Object.keys(countByBlog).map(item => {
    if (countByBlog[item] === Math.max(...Object.values(countByBlog))) {
      maxBlog.author = item
      maxBlog.blogs = countByBlog[item]
    }
  })
  return maxBlog
}

const mostLikes = (blogs) => {
  const item = (a) => a.author
  const authors = _.groupBy(blogs, item)
  const authorTotalLikes = []
  const likesArr = []
  Object.keys(authors).map(author => {
    const likesNum = authors[author].reduce((sum, item) => {
      return sum + item.likes
    },0)
    authorTotalLikes.push({
      author: author,
      likes: likesNum
    })
    likesArr.push(likesNum)
  })
  const mostLikes = authorTotalLikes.find(item => item.likes === Math.max(...likesArr))
  return mostLikes
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlog,
  mostLikes
}
