const PersonForm = ({
  addPerson,
  newName,
  newNumber,
  handleChangeNewName,
  handleChangeNewNumber,
  handleAdd,
}) => {
  return (
    <form onSubmit={addPerson}>
      <div>
        name: <input value={newName} onChange={handleChangeNewName} />
      </div>
      <div>
        number: <input value={newNumber} onChange={handleChangeNewNumber} />
      </div>
      <div>
        <button onClick={handleAdd}>add</button>
      </div>
    </form>
  )
}

export default PersonForm
