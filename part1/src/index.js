import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [maxPoint, setMaxPoint] = useState(0)
  const [maxAnecdote, setMaxAnecdote] = useState(props.anecdotes[0])
  const [point, setPoint] = useState(
    new Array(6 + 1).join('0').split('').map(parseFloat)
  )

  const getRandom = (num) => {
    return Math.floor(Math.random() * num)
  }

  const handleClick = () => () => {
    setSelected(() => getRandom(6))
    changeMaxAnecdote()
  }
  // let middlePoint = []
  const handleVotes = (selected) => () => {
    const copyPoint = [...point]
    copyPoint[selected] += 1
    setPoint(() => copyPoint)
    setMaxPoint(() => {
      return Math.max(...copyPoint)
    })
    changeMaxAnecdote()
  }

  const changeMaxAnecdote = () => {
    const index = point.findIndex((item) => item === maxPoint)
    // console.log(index, maxPoint, point)
    setMaxAnecdote(() => {
      return props.anecdotes[index]
    })
  }

  return (
    <>
      <h1>Anecdote of the day</h1>
      <div>{props.anecdotes[selected]}</div>
      <div>has {point[selected]} votes</div>
      <button onClick={handleVotes(selected)}>vote</button>
      <button onClick={handleClick()}>next anecdotes</button>
      <h1>Anecdote with most votes</h1>
      <div>{maxAnecdote}</div>
      <div>has {maxPoint} votes</div>
    </>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
]

ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById('root'))
