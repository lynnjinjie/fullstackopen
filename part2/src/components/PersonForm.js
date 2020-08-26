import React, { useState } from 'react'
import personServices from '../services/persons'
const PersonForm = ({ persons, setPersons, setErrorMessage }) => {
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const add = (event) => {
    event.preventDefault()
    const itemPerson = persons.find((person) => person.name === newName)
    console.log(itemPerson)
    if (itemPerson) {
      if (
        window.confirm(
          `${newName} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        personServices
          .update(itemPerson.id, {
            name: newName,
            number: newNumber,
          })
          .then((res) => {
            setPersons(
              persons.map((item) => (item.id !== itemPerson.id ? item : res))
            )
          })
          .catch((error) => {
            setErrorMessage(
              ` Information of ${itemPerson.name} has already been removed from server`
            )
            setTimeout(() => {
              setErrorMessage(null)
            }, 5000)
          })
      }
      return
    }
    const personObj = { name: newName, number: newNumber }
    personServices.create(personObj).then((res) => {
      setPersons([...persons, res])
      setNewName('')
    })
  }

  const handleChangeName = (event) => {
    setNewName(event.target.value)
  }
  const handleChangeNumber = (event) => {
    setNewNumber(event.target.value)
  }
  return (
    <form>
      <div>
        name: <input value={newName} onChange={handleChangeName} />
      </div>
      <div>
        number: <input value={newNumber} onChange={handleChangeNumber} />
      </div>
      <div>
        <button type="submit" onClick={add}>
          add
        </button>
      </div>
    </form>
  )
}

export default PersonForm
