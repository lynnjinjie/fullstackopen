import React from 'react'

const Weather = ({ weather, fetchData }) => {
  let weatherContent
  fetchData()
  if (Object.keys(weather).length > 0) {
    weatherContent = (
      <div>
        <p>
          <span style={{ fontWeight: 700 }}>temperature:</span>{' '}
          {weather.temperature} Celcius
        </p>
        <img src={weather['weather_icons'][0]} alt="no image" />
        <p>
          <span style={{ fontWeight: 700 }}>wind:</span>
          {weather.wind_speed} mph direction {weather.wind_dir}
        </p>
      </div>
    )
  } else {
    fetchData()
    weatherContent = '无'
  }

  return <>{weatherContent}</>
}

export default Weather
