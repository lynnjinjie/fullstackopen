import React, { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients',
  ]

  const [selected, setSelected] = useState(0)
  const [allPoints, setAllPoints] = useState(new Array(7).fill(0))
  const handleNextAnecdote = () => {
    const selectedIndex = parseInt(Math.random() * 7)
    setSelected(selectedIndex)
  }
  const handleVote = () => {
    let copyAllPoints = [...allPoints]
    copyAllPoints[selected] += 1
    setAllPoints(copyAllPoints)
  }
  return (
    <div>
      <div>{anecdotes[selected]}</div>
      <div>has {allPoints[selected]} votes</div>
      <button onClick={handleVote}>vote</button>
      <button onClick={handleNextAnecdote}>next anecdote</button>
      <h1>Anecdote with most votes</h1>
      <div>
        {
          anecdotes[
            allPoints.findIndex((item) => item === Math.max(...allPoints))
          ]
        }
      </div>
      <div>has {Math.max(...allPoints)} votes</div>
    </div>
  )
}

export default App
