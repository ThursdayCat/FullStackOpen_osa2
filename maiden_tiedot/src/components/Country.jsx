import Info from "./Info"
import List from "./List"
import Weather from "./Weather"

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

export default Country