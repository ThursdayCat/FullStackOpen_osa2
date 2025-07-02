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

export default List