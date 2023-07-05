import { useReducer, createContext, useContext } from 'react'

const NotificationContext = createContext()

export const useNotificationValue = () => {
  const notificationDispatch = useContext(NotificationContext)
  return notificationDispatch[0]
}

export const useNotificationDispatch = () => {
  const notificationDispatch = useContext(NotificationContext)
  return notificationDispatch[1]
}

const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'add':
      return `anecdote ${action.content} votes`
    case 'clear':
      return ''
    default:
      return state
  }
}

export const NotificationContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(
    notificationReducer,
    ''
  )

  return (
    <NotificationContext.Provider value={[notification, notificationDispatch]}>
      {props.children}
    </NotificationContext.Provider>
  )
}

export default NotificationContext
