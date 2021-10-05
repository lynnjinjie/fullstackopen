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
      {part.map((item) => (
        <Part part={item.name} exercises={item.exercises} key={item.id}></Part>
      ))}
    </div>
  )
}
// Total
const Total = ({ part }) => {
  return (
    <p>
      Total of exercises{' '}
      {part.reduce((total, item) => {
        return (total += item.exercises)
      }, 0)}
    </p>
  )
}
const Course = ({ course }) => {
  return (
    <div>
      <Header course={course.name}></Header>
      <Content part={course.part}></Content>
      <Total part={course.part}></Total>
    </div>
  )
}
const App = () => {
  const course = [
    {
      name: 'Half Stack application development',
      id: 1,
      part: [
        {
          id: 1,
          name: 'Fundamentals of React',
          exercises: 10,
        },
        {
          id: 2,
          name: 'Using props to pass data',
          exercises: 7,
        },
        {
          id: 3,
          name: 'State of a component',
          exercises: 14,
        },
        {
          id: 4,
          name: 'Redux',
          exercises: 10,
        },
      ],
    },
    {
      name: 'Node js',
      id: 2,
      part: [
        {
          id: 1,
          name: 'Routing',
          exercises: 3,
        },
        {
          id: 2,
          name: 'Middleware',
          exercises: 10,
        },
      ],
    },
  ]
  return (
    <div>
      {course.map((item) => (
        <Course course={item} key={item.id}></Course>
      ))}
    </div>
  )
}

export default App
