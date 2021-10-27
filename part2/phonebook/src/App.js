import React, { useEffect, useState } from 'react'
import Filter from './components/filter'
import PersonForm from './components/personForm'
import Persons from './components/persons'
import axios from 'axios'
const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  useEffect(() => {
    axios.get('http://localhost:3003/persons').then((res) => {
      setPersons(res.data)
    })
  }, [])

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
