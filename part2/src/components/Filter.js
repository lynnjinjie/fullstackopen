import React, { useState } from 'react'

const Filter = ({ persons, setPersons }) => {
  const [filterName, setFilterName] = useState('')

  const handleChangeFilterName = (event) => {
    setFilterName(event.target.value)
    const filterPersons = persons.filter((person) =>
      person.name.toLocaleLowerCase().includes(filterName.toLocaleLowerCase())
    )
    setPersons(filterPersons)
  }
  return (
    <>
      filter show with:
      <input value={filterName} onChange={handleChangeFilterName} />
    </>
  )
}

export default Filter
