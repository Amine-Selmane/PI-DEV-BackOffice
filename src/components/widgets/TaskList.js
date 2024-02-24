import React, { useState } from 'react';
import {
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  ListGroup,
  ListGroupItem,
  FormGroup,
  Label,
  Input,
} from 'reactstrap';

const TaskList = () => {
  const [todos, setTodos] = useState([
    {
      id: 1,
      content: 'Twice event for two days',
      completed: false,
    },
    {
      id: 2,
      content: 'Go for party of sahs',
      completed: false,
    },
    {
      id: 3,
      content: 'Research of making own browser',
      completed: false,
    },
    {
      id: 4,
      content: 'Check Severny admin',
      completed: true,
    },
  ]);

  const toggleComplete = (todoId) => {
    setTodos(
      todos.map((todo) => {
        if (todo.id === todoId) todo.completed = !todo.completed;
        return todo;
      }),
    );
  };

  const deleteTodo = (todoId) => {
    setTodos(todos.filter((todo) => todo.id !== todoId));
  };

  return (
    <Card>
      <CardBody>
        <CardTitle tag="h4">Task List</CardTitle>
        <CardSubtitle className="text-muted">Widget you can use</CardSubtitle>
        <div className="todo-widget mt-4">
          <ListGroup className="list-task todo-list list-group mb-0" data-role="tasklist">
            {todos.map((todo) => (
              <ListGroupItem
                className={`list-group-item d-flex align-items-center todo-item ps-0 border-0 ${
                  todo.completed ? 'completed' : ''
                }`}
                key={todo.id}
              >
                <FormGroup check inline>
                  <Input
                    type="checkbox"
                    checked={todo.completed}
                    id={todo.id}
                    data-toggle="checkbox"
                    onChange={() => toggleComplete(todo.id)}
                  />
                  <Label htmlFor={todo.id} check>
                    <span className="todo-desc">{todo.content}</span>
                  </Label>
                </FormGroup>
                {/* <div className="custom-control custom-checkbox">
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    id={todo.id}
                    className="custom-control-input"
                    data-toggle="checkbox"
                    onChange={(todoId) => toggleComplete(todo.id)}
                  />
                  <label className="custom-control-label todo-label" htmlFor={todo.id}>
                    <span className="todo-desc">{todo.content}</span>
                  </label>
                </div> */}
                <span className="cursor-pointer ms-auto" onClick={() => deleteTodo(todo.id)}>
                  <i className="bi bi-trash fs-4 text-danger"></i>
                </span>
              </ListGroupItem>
            ))}
          </ListGroup>
        </div>
      </CardBody>
    </Card>
  );
};

export default TaskList;
