import React, { useState, useEffect } from 'react'
import personServices from './services/persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [errorMessage, setErrorMessage] = useState('some error happened...')

  useEffect(() => {
    personServices.getAll().then((res) => setPersons(res))
  }, [])

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={errorMessage}></Notification>
      <Filter persons={persons} setPersons={setPersons} />
      <h3>Add a new</h3>
      <PersonForm
        persons={persons}
        setPersons={setPersons}
        setErrorMessage={setErrorMessage}
      />
      <h3>Numbers</h3>
      <Persons persons={persons} setPersons={setPersons} />
    </div>
  )
}

export default App
