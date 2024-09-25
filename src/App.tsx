import 'bootstrap/dist/css/bootstrap.min.css'
import { useEffect, useState } from 'react'
import { Button, Container, Form, ListGroup } from 'react-bootstrap'
import Todo from './components/Todo'
import { TodoType } from './types/TodoType'
import AddTodo from './components/AddTodo'

function App() {

  const [todos, setTodos] = useState<TodoType[]>([])
  const [showAdd, setShowAdd] = useState(false)

  useEffect(() => {
    fetch('http://localhost:8080/todos', {method: "GET", headers: {"Content-Type": "application/json", "Accept": "application/json"}})
      .then(response => response.json())
      .then(data => {
        setTodos(data)
      })
  }, [])

  const toggleAdd = () => {
    setShowAdd(!showAdd)
  }

  return (
    <>
      <Container>
        <h1>Todo List</h1>
        <Button onClick={toggleAdd}>Add</Button>
        <Form>
          <ListGroup>
            {
              todos &&
              todos.map(todo => <Todo key={todo.id} id={todo.id} name={todo.name} done={todo.done} /> )
            }
          </ListGroup>
        </Form>
        {
          showAdd &&
          <AddTodo toggleAdd={toggleAdd} setTodos={setTodos} todos={todos} />
        }
      </Container>
    </>
  )
}

export default App
