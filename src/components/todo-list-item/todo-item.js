import React from 'react';
import { connect } from 'react-redux';
import { todoSelectors } from './../../reducers'
import TodoControls from './../todo-controls';

const TodoItem = ({ todoId, todo, onSelect, isAccount }) => todo ? (
  <div className={'TodoItem'}>
    <div>
      <p onClick={() => onSelect(todo)}>{todo.title}</p>
    </div>
    <div>
      {isAccount && <TodoControls todoId={todoId} />}
    </div>
  </div>
) : null

export default connect(
  (state, props) => {
    const id = props.todoId;
    const todo = todoSelectors.getById(state, id);

    return {
      todo
    }
  }
)(TodoItem)