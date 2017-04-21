import React from 'react';
import TodoItem from '../todo-list-item/todo-list-item';
import './todo-list.css'

const TodoList = ({ todos, onSelect = () => undefined, onRemove = () => undefined }) => (
  <div className="TodoList">
    {
      todos.map(
        todo => (
          <div key={todo.id} className="TodoList_Item">
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