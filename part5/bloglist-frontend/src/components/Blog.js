import { useState } from 'react'

const Blog = ({ blog, user, changeLikes, delBlog }) => {
  const [visible, setVisible] = useState(false)

  const blogUser = blog.user || { username: '' }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const removeStyle = {
    backgroundColor: '#5085ee'
  }

  const toggleVisible = (event) => {
    event.preventDefault()
    setVisible(!visible)
  }

  const handleLike = () => {
    const changeBlog = {
      likes: ++blog.likes
    }
    changeLikes(blog.id, changeBlog)
  }
  // 判断当前blog是否为登录用户创建
  const isCurrentAuthor = () => {
    return blogUser.username === user.username
  }

  const removeBlog = () => {
    const isRemove = window.confirm(`Remove blog ${blog.title} by ${blog.author}`)
    isRemove && delBlog(blog.id)
  }

  return  (
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author}
        <button onClick={toggleVisible}>{visible ? 'hide' : 'view'}</button>
      </div>
      <div style={{ display: visible ? '' : 'none' }}>
        <div>{blog.url}</div>
        <div>likes {blog.likes} <button onClick={handleLike}>like</button></div>
        <div>{blogUser.username}</div>
        <button style={{ ...removeStyle, display: isCurrentAuthor() ? '' : 'none' }} onClick={removeBlog}>remove</button>
      </div>
    </div>
  )
}

export default Blog
