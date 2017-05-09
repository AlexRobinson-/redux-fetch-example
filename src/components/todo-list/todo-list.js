import React from 'react';
import TodoItem from '../todo-item';
import './todo-list.css'

const TodoList = ({ todos, onSelect = () => undefined, onRemove = () => undefined, isAccount }) => (
  <div className="TodoList">
    {
      todos.map(
        todo => (
          <div key={todo.id} className="TodoList_Item">
            <TodoItem
              isAccount={isAccount}
              todoId={todo.id}
              onSelect={onSelect}
            />
          </div>
        )
      )
    }
  </div>
)

export default TodoList;