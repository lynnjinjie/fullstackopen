import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogForm from './components/BlogForm'
import Toggleable from './components/Toggleable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [message, setMessage] = useState(null)
  const [messageStatus, setMessageStatus] = useState('')
  const [username, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const blogFormRef = useRef()

  useEffect(() => {
    getAllBlogs()
  }, [])

  useEffect(() => {
    const loggedUserInfo = window.localStorage.getItem('loggedUserInfo')
    if (loggedUserInfo) {
      const user = JSON.parse(loggedUserInfo)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const getAllBlogs = async () => {
    const blogs = await blogService.getAll()
    setBlogs(blogs.sort((a, b) => b.likes - a.likes))
  }

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('loggedUserInfo', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUserName('')
      setPassword('')
    } catch (error) {
      setMessage('wrong username or password')
      setMessageStatus('error')
      setTimeout(() => {
        setMessage(null)
        setMessageStatus('')
      }, 5000)
    }
  }
  const handleLogout = () => {
    window.localStorage.removeItem('loggedUserInfo')
    setUser(null)
  }
  const createBlog = async (newBlog) => {
    try {
      const blog = await blogService.create(newBlog)
      setBlogs(blogs.concat(blog))
      setMessage(`a new blog You're NOT gonna need it! by ${blog.author} added`)
      setMessageStatus('success')
      setTimeout(() => {
        setMessage(null)
        setMessageStatus('')
      }, 5000)
      blogFormRef.current.toggleVisibility()
    } catch (error) {
      console.log('error',error)
    }
  }

  // 点赞喜欢
  const changeLikes = async (id, changeBlog) => {
    await blogService.update(id, changeBlog)
    getAllBlogs()
  }

  // 移除当前作者的blog
  const delBlog = async (id) => {
    await blogService.remove(id)
    getAllBlogs()
  }

  const loginForm = () => (
    <div>
      <h2>Log in to application</h2>
      <Notification message={message} status={messageStatus} />
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUserName(target.value)}
          />
        </div>
        <div>
          password
          <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type='submit'>login</button>
      </form>
    </div>
  )
  const blogList = () => (
    <div>
      <h2>blogs</h2>
      <Notification message={message} status={messageStatus} />
      <div>{user.name} logged in <button onClick={handleLogout}>logout</button></div>
      <Toggleable buttonLabel="create new blog" ref={blogFormRef}>
        <BlogForm createBlog={createBlog}></BlogForm>
      </Toggleable>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} user={user} changeLikes={changeLikes} delBlog={delBlog} />
      )}
    </div>
  )
  if (user === null) {
    return loginForm()
  }
  return blogList()
}

export default App
