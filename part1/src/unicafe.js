import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({ text, handleClick }) => {
  return <button onClick={handleClick}>{text}</button>
}

const Statistics = ({ good, neutral, bad }) => {
  const all = good + neutral + bad
  const average = (1 * good + -1 * bad) / (good + neutral + bad)
  const positive = `${(good / (good + neutral + bad)) * 100}% `
  return (
    <table>
      <thead>
        <Feedback text="good" value={good}></Feedback>
        <Feedback text="neutral" value={neutral}></Feedback>
        <Feedback text="bad" value={bad}></Feedback>
      </thead>
      <tbody>
        <Feedback text="all" value={all}></Feedback>
        <Feedback text="average" value={average}></Feedback>
        <Feedback text="positive" value={positive}></Feedback>
      </tbody>
    </table>
  )
}
const Feedback = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}
const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const setGoodFeedBack = () => () => setGood(good + 1)
  const setNeutralFeedBack = () => () => setNeutral(neutral + 1)
  const setBadFeedBack = () => () => setBad(bad + 1)

  let Container
  if ((good || neutral || bad) === 0) {
    Container = <div>No feedback given</div>
  } else {
    Container = (
      <Statistics good={good} neutral={neutral} bad={bad}></Statistics>
    )
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button text="good" handleClick={setGoodFeedBack()}></Button>
      <Button text="neutral" handleClick={setNeutralFeedBack()}></Button>
      <Button text="bad" handleClick={setBadFeedBack()}></Button>
      <h1>statistics</h1>

      {Container}
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
