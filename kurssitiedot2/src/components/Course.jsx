const Part = ({ part }) => {
    console.log(part)
    return(
      <p>{part.part} {part.exercises}</p>
    )
  }
  
const Content = ({parts}) => {
    console.log(parts)
    return(
        <div>
        {parts.map(part => 
            <Part key={part.id} part={part} />
        )}
        </div>
    )
}
  
const Header = ({course}) => (
    <h2>{course.name}</h2>
)

const Total = ({ exercise }) => {
    console.log(exercise)
    const sum = exercise.reduce((s, current) => s + current.exercises, 0)
    return(
        <div>
        <b>Total of {sum} exercises </b>
        </div>
    )
}
  
const Course = ({course}) => {
    console.log(course)
    return(
        <div>
        <Header course={course} />
        <Content parts={course.parts} />
        <Total exercise={course.parts}/>
        </div>  
    )
}

export default Course