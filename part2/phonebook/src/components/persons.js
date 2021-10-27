const Person = ({ persons, handleDelItem }) => {
  return (
    <div>
      {persons.map((item, i) => (
        <div key={i}>
          {item.name} {item.number}
          <button
            onClick={() => {
              handleDelItem(item)
            }}
          >
            delete
          </button>
        </div>
      ))}
    </div>
  )
}

export default Person
