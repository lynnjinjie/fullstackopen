import React, { useState } from 'react'
import Filter from './components/filter'
import PersonForm from './components/personForm'
import Persons from './components/persons'
const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 },
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const addPerson = (event) => {
    event.preventDefault()
    const isHavePeron = persons.findIndex((item) => item.name === newName)
    if (isHavePeron !== -1) {
      alert(`${newName} is already added to phonebook`)
      return
    }

    const person = {
      name: newName,
      number: newNumber,
      id: persons[persons.length - 1].id,
    }
    setPersons(persons.concat(person))
    setNewName('')
    setNewNumber('')
  }
  const handleChangeNewName = (event) => {
    setNewName(event.target.value)
  }
  const handleChangeNewNumber = (event) => {
    setNewNumber(event.target.value)
  }
  const handleFilterName = (event) => {
    console.log('evnet', event.target.value)
    const filterName = event.target.value
    const filterPersons = persons.filter((item) => {
      return item.name
        .toLocaleLowerCase()
        .includes(filterName.toLocaleLowerCase())
    })
    setPersons(filterPersons)
  }
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handleFilterName={handleFilterName} />
      <h2>add a new</h2>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        newNumber={newNumber}
        handleChangeNewName={handleChangeNewName}
        handleChangeNewNumber={handleChangeNewNumber}
      />
      <h2>Numbers</h2>
      <Persons persons={persons}></Persons>
    </div>
  )
}

export default App
