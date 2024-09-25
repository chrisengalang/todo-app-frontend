import { Form } from "react-bootstrap"
import { TodoType } from "../types/TodoType"
import { useState } from "react"

interface Props {
  toggleAdd: () => void,
  setTodos: React.Dispatch<React.SetStateAction<TodoType[]>>
  todos: TodoType[]
}

const AddTodo = ({toggleAdd, setTodos, todos} : Props) => {

  const [name, setName] = useState('')
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    fetch('http://localhost:8080/todos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({name: name, done: false})
    })
      .then(response => response.json())
      .then(data => {
        const newTodos = [...todos, data]
        setTodos(newTodos)
      })
    toggleAdd()
  }

  return <>
    <h1>Add Todo</h1>
    <Form onSubmit={handleSubmit}>
      <Form.Control onChange={(e) => setName(e.target.value)} />
    </Form>
  </>
}

export default AddTodo