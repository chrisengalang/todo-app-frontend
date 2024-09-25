import { Form, ListGroup } from "react-bootstrap"

interface Props {
  id: number
  name: string
  done: boolean
}

const Todo = ({id, name, done}: Props) => {
  return <>
    <ListGroup.Item>
      <Form.Check type='checkbox' defaultChecked={done} label={name} />
    </ListGroup.Item>
  </>
}

export default Todo