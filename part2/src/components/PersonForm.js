import React, { useState } from 'react'

const PersonForm = ({ persons, setPersons }) => {
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const add = (event) => {
    event.preventDefault()
    const isHave = persons.some((person) => person.name === newName)
    console.log(isHave)
    if (isHave) {
      alert(`${newName} is already added to phonebook`)
      return
    }
    setPersons([...persons, { name: newName, number: newNumber }])
    setNewName('')
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
