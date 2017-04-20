import React from 'react';
import TodoItem from './todo-item';

const TodoList = ({ todos, onSelect = () => undefined, onRemove = () => undefined }) => (
  <div>
    {
      todos.map(
        todo => (
          <div key={todo.id} style={{
            width: 350
          }}>
            <TodoItem
              todoId={todo.id}
              onSelect={onSelect}
              onRemove={onRemove}
            />
          </div>
        )
      )
    }
  </div>
)

export default TodoList;