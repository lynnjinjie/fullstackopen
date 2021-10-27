import React, { useState } from 'react'
import axios from 'axios'
const App = () => {
  const [country, setCountry] = useState('')
  const [content, setContent] = useState('')
  // const [tips, setTips] = useState('Too many matches. specify another filter')
  const handleChange = (e) => {
    console.log(process.env.REACT_APP_API_KEY)
    setCountry(e.target.value)
  }
  const searchCountry = (e) => {
    if (e.key === 'Enter') {
      axios
        .get(`https://restcountries.com/v3.1/name/${country}`)
        .then((res) => {
          if (res.status === 200) {
            if (res.data.length > 10) {
              setContent(<div>Too many matches. specify another filter</div>)
            } else if (res.data.length < 10 && res.data.length > 1) {
              setContent(
                res.data.map((item) => (
                  <div key={item.area}>
                    {item.name.common}
                    <button onClick={() => handleClickItem(item)}>show</button>
                  </div>
                ))
              )
            } else if (res.data.length === 1) {
              const item = res.data[0]
              setContent(detailCountry(item))
            }
          }
        })
    }
  }
  const handleClickItem = (item) => {
    setContent(detailCountry(item))
  }
  const detailCountry = (item) => {
    return (
      <div>
        <h1>{item.name.common}</h1>
        <p>capital: {item.capital[0]}</p>
        <p>population: {item.population}</p>
        <h2>languages</h2>
        <ul>
          {Object.values(item.languages).map((lan, i) => (
            <li key={i}>{lan}</li>
          ))}
        </ul>
        <img src={item.flags.svg} alt="flags" width="150" height="150" />
      </div>
    )
  }
  return (
    <div>
      find countries
      <input
        type="text"
        value={country}
        onChange={handleChange}
        onKeyUp={searchCountry}
      />
      <div>{content}</div>
    </div>
  )
}

export default App
