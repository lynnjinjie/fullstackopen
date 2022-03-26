import React, { useEffect, useState } from 'react'
import Filter from './components/filter'
import PersonForm from './components/personForm'
import Persons from './components/persons'
import Notification from './components/Notification'
import { getAll, create, remove, update } from './services/person'
import './index.css'
const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [message, setMessage] = useState(null)
  const [msgType, setMsgType] = useState('success')
  useEffect(() => {
    console.log(getAll())
    getAll().then((data) => {
      setPersons(data)
    })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    const isHavePeron = persons.findIndex((item) => item.name === newName)
    if (isHavePeron !== -1) {
      alert(`${newName} is already added to phonebook`)
      return
    }

    // const person = {
    //   name: newName,
    //   number: newNumber,
    //   id: persons[persons.length - 1].id,
    // }
    // setPersons(persons.concat(person))
    // setNewName('')
    // setNewNumber('')
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
  // 新增
  const handleAdd = (e) => {
    e.preventDefault()
    const isHavePeron = persons.find((item) => item.name === newName)
    if (isHavePeron) {
      if (
        window.confirm(
          `${isHavePeron.name} is already added to phonebook, replace the old number with a new one ?`
        )
      ) {
        update(isHavePeron.id, {
          name: newName,
          number: newNumber,
        })
          .then((data) => {
            setPersons(persons.map((p) => (p.id !== data.id ? p : data)))
          })
          .catch((error) => {
            setMessage(
              `Information of ${isHavePeron.name} has already been removed from server`
            )
            setMsgType('fail')
            setTimeout(() => {
              setMessage(null)
            }, 2000)
          })
      }
      return
    }
    const newPerson = {
      name: newName,
      number: newNumber,
      id: persons[persons.length - 1].id + 1,
    }
    create(newPerson).then((data) => {
      setPersons(persons.concat(data))
      setMessage(`Added ${data.name}`)
      setMsgType('success')
      setTimeout(() => {
        setMessage(null)
      }, 2000)
    }).catch(error => {
      setMessage(error.response.data)
      setMsgType('fail')
    })
  }
  const handleDelItem = (item) => {
    if (window.confirm(`Delete ${item.name} ?`)) {
      remove(item.id).then((data) => {
        setPersons(persons.filter((v) => v.id !== item.id))
      })
    }
  }
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} type={msgType}></Notification>
      <Filter handleFilterName={handleFilterName} />
      <h2>add a new</h2>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        newNumber={newNumber}
        handleChangeNewName={handleChangeNewName}
        handleChangeNewNumber={handleChangeNewNumber}
        handleAdd={handleAdd}
      />
      <h2>Numbers</h2>
      <Persons persons={persons} handleDelItem={handleDelItem}></Persons>
    </div>
  )
}

export default App
