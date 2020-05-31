import React from 'react'

const Course = ({ course }) => {
  const { name, parts } = course
  const total = parts.reduce((sum, part) => sum + part.exercises, 0)
  return (
    <div>
      <h1 className="header">{name}</h1>
      <div className="contant">
        {parts.map((part) => (
          <div key={part.id}>
            {part.name}&nbsp;
            <span>{part.exercises}</span>
          </div>
        ))}
      </div>
      <h3>total of {total} exercises</h3>
    </div>
  )
}

export default Course
