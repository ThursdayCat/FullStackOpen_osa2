import { useState, useEffect } from 'react'
import axios from 'axios'
const api_key = import.meta.env.VITE_WEATHER_KEY

import Search from './components/Search'
import Country from './components/Country'





const App = () => {
  console.log(api_key)
  const [allCountries, setAllCountries] = useState([])
  const [search, setSearch] = useState('')
  const [countriesToShow, setCountriesToShow] = useState([])
  const [country, setCountry] = useState(null)
  const [weather, setWeather] = useState(null)


  useEffect(() => {
    console.log('effect')
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => {
        console.log('promise fulfilled. countries are:', response.data)
        setAllCountries(response.data)
      })
  }, [])

  const HandleSearch = (event) => {
    const currentSearch = event.target.value
    console.log('imput changed to',currentSearch)

    setSearch(currentSearch) 
    const matchingCountries = allCountries.filter(country => country.name.common.toLowerCase().includes(currentSearch))
    console.log('matching countries', matchingCountries)

    if (matchingCountries.length > 10) {
      setCountriesToShow(matchingCountries)
      setCountry(null)
    } 
    else if (matchingCountries.length === 1) {
      setCountry(matchingCountries[0])
      setCountriesToShow([])
      axios
        .get(`https://api.openweathermap.org/data/2.5/weather?lat=${matchingCountries[0].capitalInfo.latlng[0]}&lon=${matchingCountries[0].capitalInfo.latlng[1]}&exclude=minutely,hourly,daily,alerts&appid=${api_key}&units=metric`)
        .then(response => {
      console.log('Weather promise fulfilled', response.data)
      setWeather(response.data)
    })
      
    } 
    else if (currentSearch !== ''){
      setCountriesToShow(matchingCountries)
      setCountry(null)
    }
    else {
      setCountriesToShow([])
      setCountry(null)
    }
  }

  const showCountry = (props) => {
    console.log('show country ',props)
    setCountriesToShow([])
    setSearch('')
    setCountry(countriesToShow.find(({name}) => name.common === props))
  }
  
  return(
    <div>
      <Search 
        itemsToShow={countriesToShow} 
        maxItems={10} 
        search={search} 
        handle={HandleSearch}
        listItem={countriesToShow.map(country => ({key: country.name.common, prop: country.name.common}))}
        handleClick={showCountry}/>
      <Country countries={country} weather={weather}/>
    </div>
  )
}

export default App
