const Weather = ({ country, weather }) => {
  console.log('weather', weather)
  if (weather !== null) {
    return (
        <div>
          <h2>Weather in {country.capital}</h2>
          <img src = {`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}/>
          <p>Temperature: {weather.main.temp} Celsius</p>
          <p>Wind: {weather.wind.speed} m/s</p>
        </div>
    )
  }
}

export default Weather