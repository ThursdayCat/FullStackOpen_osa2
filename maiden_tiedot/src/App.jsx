import { useState, useEffect } from 'react'
import flag from './assets/react.svg'
import axios from 'axios'
const api_key = import.meta.env.VITE_WEATHER_KEY

const Info = (props) => {
  //console.log(props)
  return(
    <div>{props.property} {props.value} {props.unit}</div>
  )
}

//odottaa tulostettavia asioita taulukkona objekteja joilla kentät key ja prop 
// esim [{key:'fin', prop:'Finnis'}, {key:'swe', prop:'Swdish} ]
const List = ({ listItem, button}) => {
  //console.log(listItem)
  return(
    <ul>
      {listItem.map(listItem => <li key={listItem.key}> {listItem.prop} {button}</li>)}
    </ul>
  )
}

const Filter = (props) => {
  return(
    <div>
      Find countries <input value={props.search} onChange={props.handle}/>
    </div>
  )
} 

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

const Search = (props) => {
  //console.log(props)
  if (props.itemsToShow.length > props.maxItems) {
    return (
      <div>
        <Filter search = {props.search} handle = {props.handle} />
        Too many matches, specify more letters.
      </div>
    )
  }
  return(
    <div>
      <Filter search = {props.search} handle = {props.handle} />
      {props.listItem.map(listItem => 
      <div key={listItem.key}> {listItem.prop} {<button onClick={() => props.handleClick(listItem.prop)}>Show</button>}</div>)}
    </div>
  )
}

const Country = ({countries, weather}) => {
  console.log('country component',countries)
  //console.log(Object.keys(countries[0].languages))
  if (countries !== null) {
    return (
      <div>
        <h1>{countries.name.common}</h1>
        <Info property = {'Capital:'} value = {countries.capital}/>
        <Info property ={'Area:'} value = {countries.area} unit={'km^2'}/>
        <h2>Languages</h2>
        <List listItem = {Object.keys(countries.languages).map((key) => ({key: key, prop: countries.languages[key]}))}/>
        <img src = {countries.flags.png}/>
        <Weather country={countries} weather={weather}/>
      </div>
    )
  }
}


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

  const showWeather = (props) => {
    axios
    .get(`https://api.openweathermap.org/data/2.5/weather?lat=${country.capitalInfo.latlng[0]}&lon=${country.capitalInfo.latlng[1]}&exclude=minutely,hourly,daily,alerts&appid=${api_key}&units=metric`)
    .then(response => {
      console.log('Weather promise fulfilled', response.data)
      setWeather(response.data)
    })
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
