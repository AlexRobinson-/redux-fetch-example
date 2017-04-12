import React from 'react';

const TodoList = ({ todos, onSelect = () => undefined }) => (
  <ul>
    {
      todos.map(
        todo => (
          <li key={todo.id} onClick={() => onSelect(todo)}>{todo.title}</li>
        )
      )
    }
  </ul>
)

export default TodoList;