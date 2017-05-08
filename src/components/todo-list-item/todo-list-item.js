import React from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { todoSelectors, fetchSelectors } from './../../reducers'
import { retrySave, cancelSave, retryCreate, cancelCreate } from '../../actions/todo';
import * as refs from './../../refs';
import TodoStatus from './todo-status';

import './todo-list-item.css';

const TodoListItem = ({ todo, onSelect, onRemove, failedUpdate, failedSave, retrySave, cancelSave, failedCreate, retryCreate, cancelCreate, isBeingDeleted, hasFailedDeleting }) => (
  <div
    className={classNames(
      'Todo',
      {
        'Todo__failed': failedUpdate,
        'Todo__optimistic': !failedUpdate && todo.__optimistic === true,
      }
    )}
  >
    <div className="Todo_Details">
      <div>
        <p onClick={() => onSelect(todo)}>{todo.title}</p>
        <TodoStatus todoId={todo.id} />
      </div>
      <button onClick={() => onRemove(todo)}>X</button>
    </div>

  </div>
)

export default connect(
  (state, props) => {
    const todo = todoSelectors.getById(state, props.todoId)

    if (!todo) {
      return {}
    }

    return {
      todo,
      failedUpdate: (todo.__refs || []).map(ref => fetchSelectors.getHasFailed(state, ref)).includes(true),
      failedSave: (todo.__refs || []).includes(`TODO_${todo.id}/SAVE`),
      isOptimistic: todo.__optimistic === true,
      failedCreate: todo.id === 'optimistic-todo' && fetchSelectors.getHasFailed(state, refs.CREATE_TODO),
      isBeingDeleted: fetchSelectors.getIsPending(state, refs.getRemoveTodoRef(props.todoId)),
      hasFailedDeleting: fetchSelectors.getHasFailed(state, refs.getRemoveTodoRef(props.todoId))
    }
  },
  {
    retrySave,
    cancelSave,
    retryCreate,
    cancelCreate
  }
)(TodoListItem)