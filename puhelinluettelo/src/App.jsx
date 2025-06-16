import { useState, useEffect } from 'react'
import axios from 'axios'

const Person = (props) => (
  <p>{props.name} {props.number}</p>
)

const Filter = (props) => {
  return(
    <div>
      filter shown with <input value={props.search} onChange={props.handle}/>
    </div>
  )
}

const PersonForm = (props) => {
  return(
    <form onSubmit={props.submit}>
      <div>
        name: <input value={props.name} onChange={props.handlname}/>
      </div>
      <div>
        number: <input value={props.number} onChange={props.handlenumber}/>
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const Persons = ({persons}) => {
  return(
    <div>
      {persons.map(person =>
          <Person key = {person.name} name = {person.name} number = {person.number}/>
        )}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')

  useEffect(() => {
    console.log('effect')
    axios.get('http://localhost:3001/persons').then(response => {
      console.log('promise fulfilled')
      setPersons(response.data)
    })
  }, [])

  const AddName = (event) => {
    event.preventDefault()

    if (newName === ''){
      alert(`Type the name of the person to be added`)
    }
    else if (persons.find(({name}) => name === newName) === undefined){
      console.log('"add" clicked', newName)
      const nameObject = {
        name: newName,
        number: newNumber,
        id: persons.length + 1
      }
      setPersons(persons.concat(nameObject))
    }
    else {
      alert(`${newName} is already added to your phonebook`)
    }
    setNewName('')
    setNewNumber('')
  }

  const HandleNameCange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const HandleNumberCange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const HandleSearch = (event) => {
    setSearch(event.target.value)
  }

  const contactsToShow = search === ''
  ? persons
  : persons.filter(person => person.name.toLowerCase().includes(search))

  return (
    <div>
      <h1>Phonebook</h1>
      <Filter search = {search} handle = {HandleSearch} />
      <h2>Add new contact</h2>
      <PersonForm submit = {AddName} number = {newNumber} name = {newName} handlname = {HandleNameCange} handlenumber = {HandleNumberCange}/>
      <h2>Numbers</h2>
      <Persons persons = {contactsToShow}/>
    </div>
  )

}

export default App
