import React from 'react'

// Header
const Header = ({ course }) => {
  return <h1>{course}</h1>
}
// Content
const Part = ({ part, exercises }) => {
  return (
    <p>
      {part} {exercises}
    </p>
  )
}
const Content = ({ content }) => {
  return (
    <div>
      <Part part={content.part1} exercises={content.exercises1}></Part>
      <Part part={content.part2} exercises={content.exercises2}></Part>
      <Part part={content.part3} exercises={content.exercises3}></Part>
    </div>
  )
}
// Total
const Total = ({ total }) => {
  return <p>Number of exercises {total}</p>
}
const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14
  return (
    <div>
      <Header course={course}></Header>
      <Content
        content={{ part1, exercises1, part2, exercises2, part3, exercises3 }}
      ></Content>
      <Total total={exercises1 + exercises2 + exercises3}></Total>
    </div>
  )
}

export default App
