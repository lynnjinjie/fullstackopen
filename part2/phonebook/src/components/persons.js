const Person = ({ persons }) => {
  return (
    <div>
      {persons.map((item, i) => (
        <div key={i}>
          {item.name} {item.number}
        </div>
      ))}
    </div>
  )
}

export default Person
