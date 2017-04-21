import React from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { todoSelectors, fetchSelectors } from './../../reducers'
import { retrySave, cancelSave } from '../../actions/todo';
import './todo-list-item.css';

const TodoListItem = ({ todo, onSelect, onRemove, failedUpdate, failedSave, retrySave, cancelSave }) => (
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

        {
          failedUpdate && failedSave && (
            <div className="Todo_Options">
              Failed Saving
              <button onClick={() => retrySave(todo.id)}>Retry save</button>
              <button onClick={() => cancelSave(todo.id)}>Cancel save</button>
            </div>
          )
        }
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

    console.log('is optimistic', todo.title, todo.__optimistic === true)

    return {
      todo,
      failedUpdate: (todo.__refs || []).map(ref => fetchSelectors.getHasFailed(state, ref)).includes(true),
      failedSave: (todo.__refs || []).includes(`TODO_${todo.id}/SAVE`),
      isOptimistic: todo.__optimistic === true
    }
  },
  { retrySave, cancelSave }
)(TodoListItem)