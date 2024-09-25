import { useState } from "react"
import { Form, ListGroup } from "react-bootstrap"

interface Props {
  id: number
  name: string
  done: boolean
}

const Todo = ({id, name, done}: Props) => {

  const [isDone, setIsDone] = useState(done)

  const handleToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked

    fetch('http://localhost:8080/todos', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({id: id, name: name, done: isChecked})
    })
      .then(response => response.json())
      .then(data => setIsDone(data.done))
  }

  return <>
    <ListGroup.Item>
      <Form.Check type='checkbox' defaultChecked={isDone} label={name} onChange={handleToggle} />
    </ListGroup.Item>
  </>
}

export default Todo