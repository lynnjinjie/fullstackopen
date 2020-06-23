import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Weather from './Weather'

const Countries = ({ filter, countries }) => {
  const [weather, setWeather] = useState({})

  let nameList = countries.filter((country) =>
    country.name.toLocaleLowerCase().includes(filter.toLocaleLowerCase())
  )
  // console.log('name', nameList)
  const api_key = process.env.REACT_APP_API_KEY
  const fetchData = async () => {
    console.log('2333')
    const res = await axios.get(
      `http://api.weatherstack.com/current?access_key=${api_key}&query=${nameList[0].capital}`
    )
    console.log('res')
    setWeather(res.data.current)
  }
  let content
  if (filter) {
    if (nameList.length > 10) {
      content = 'Too many matches, specify another filter'
    } else if (nameList.length > 1) {
      content = nameList.map((item, index) => (
        <div key={index}>{item.name}</div>
      ))
    } else if (nameList.length === 1) {
      const item = nameList[0]
      content = (
        <div>
          <h1>{item.name}</h1>
          <p>capital {item.capital}</p>
          <p>population {item.population}</p>
          <h2>languages</h2>
          <ul>
            {item.languages.map((lan, index) => (
              <li key={index}>{lan.name}</li>
            ))}
          </ul>
          <img
            style={{ width: '100px', height: '100px' }}
            src={item.flag}
          ></img>
          <h2>Weather in {item.capital}</h2>
          <Weather weather={weather} fetchData={fetchData}></Weather>
        </div>
      )
    } else {
      content = 'no countries'
    }
  }
  return (
    <>
      <div>{content}</div>
    </>
  )
}

export default Countries
