import React from 'react'
import personServices from '../services/persons'

const Persons = ({ persons, setPersons }) => {
  const del = (id, name) => {
    console.log(name)
    if (window.confirm(`Delete ${name}?`)) {
      personServices.del(id).then((res) => {
        console.log('res', res)
        setPersons(persons.filter((item) => item.id !== id))
      })
    }
  }
  return (
    <ul>
      {persons.map((person) => (
        <li key={person.id}>
          {person.name} {person.number}
          &nbsp;
          <button
            onClick={() => {
              del(person.id, person.name)
            }}
          >
            delete
          </button>
        </li>
      ))}
    </ul>
  )
}

export default Persons
