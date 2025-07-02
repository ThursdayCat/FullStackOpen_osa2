const Filter = (props) => {
  return(
    <div>
      Find countries <input value={props.search} onChange={props.handle}/>
    </div>
  )
} 

export default Filter