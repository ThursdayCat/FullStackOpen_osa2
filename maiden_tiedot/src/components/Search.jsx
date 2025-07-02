import Filter from "./Filter"

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

export default Search