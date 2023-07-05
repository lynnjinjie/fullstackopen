import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import { getAll, update } from './requests'
import { useNotificationDispatch } from './NotificationContext'

const App = () => {
  const notificationDispatch = useNotificationDispatch()

  const queryClient = useQueryClient()
  const updateAnecdoteMutation = useMutation(update, {
    onSuccess: (anecdote) => {
      const anecdotes = queryClient.getQueryData('anecdotes')
      const newAnecdotes = anecdotes.map((item) => {
        if (item.id === anecdote.id) {
          return {
            ...item,
            votes: anecdote.votes,
          }
        }
        return item
      })
      queryClient.setQueryData('anecdotes', newAnecdotes)
    },
  })

  const handleVote = (anecdote) => {
    updateAnecdoteMutation.mutate({ ...anecdote, votes: ++anecdote.votes })
    notificationDispatch({ type: 'add', content: anecdote.content })
    setTimeout(() => {
      notificationDispatch({ type: 'clear', content: '' })
    }, 5000)
  }

  const result = useQuery('anecdotes', getAll, {
    refetchOnWindowFocus: false,
    retry: 1,
  })

  if (result.status === 'loading') {
    return <div>Loading...</div>
  }

  if (result.status === 'error') {
    return <div>anecdote service not available due to problems in server</div>
  }

  const anecdotes = result.data

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default App
