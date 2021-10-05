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
const Content = ({ part }) => {
  return (
    <div>
      <Part part={part[0].name} exercises={part[0].exercises}></Part>
      <Part part={part[1].name} exercises={part[1].exercises}></Part>
      <Part part={part[2].name} exercises={part[2].exercises}></Part>
    </div>
  )
}
// Total
const Total = ({ part }) => {
  return (
    <p>
      Number of exercises{' '}
      {part[0].exercises + part[1].exercises + part[2].exercises}
    </p>
  )
}
const App = () => {
  const course = {
    name: 'Half Stack application development',
    part: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
      },
      {
        name: 'State of a component',
        exercises: 14,
      },
    ],
  }
  return (
    <div>
      <Header course={course.name}></Header>
      <Content part={course.part}></Content>
      <Total part={course.part}></Total>
    </div>
  )
}

export default App
