import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [like, setLike] = useState('')
  const [message, setMessage] = useState(null)
  const [messageStatus, setMessageStatus] = useState('')
  const [username, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserInfo = window.localStorage.getItem('loggedUserInfo')
    if (loggedUserInfo) {
      const user = JSON.parse(loggedUserInfo)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    
    try {
      const user = await loginService.login({username, password})
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
      }, 5000);
    }
  }
  const handleLogout = () => {
    window.localStorage.removeItem('loggedUserInfo')
    setUser(null)
  }
  const createBlog = async (event) => {
    event.preventDefault()
    try {
      const blog = await blogService.create({
        title,
        author,
        url,
        like
      })
      setBlogs(blogs.concat(blog))
      setMessage(`a new blog You're NOT gonna need it! by ${blog.author} added`)
      setMessageStatus('success')
      setTimeout(() => {
        setMessage(null)
        setMessageStatus('')
      }, 5000);
    } catch (error) {
      console.log('error',error)
    }
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
           onChange={({target}) => setUserName(target.value)}
          />
        </div>
        <div>
          password
          <input
           type="password"
           value={password}
           name="Password"
           onChange={({target}) => setPassword(target.value)}
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
      <h2>create new</h2>
      <form onSubmit={createBlog}>
        <div>
          title:
          <input
           type="text"
           value={title}
           name="Title"
           onChange={({target}) => setTitle(target.value)}
          />
        </div>
         <div>
          author:
          <input
           type="text"
           value={author}
           name="Author"
           onChange={({target}) => setAuthor(target.value)}
          />
        </div>
        <div>
          url:
          <input
           type="text"
           value={url}
           name="Url"
           onChange={({target}) => setUrl(target.value)}
          />
        </div>
        <div>
          like:
          <input
           type="text"
           value={like}
           name="Like"
           onChange={({target}) => setLike(target.value)}
          />
        </div>
        <button type='submit'>create</button>
      </form>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
  if (user === null) {
    return loginForm()
  } 
  return blogList()
}

export default App
