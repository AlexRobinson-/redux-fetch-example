import React from 'react';
import { connect } from 'react-redux';
import { todoSelectors, fetchSelectors } from './../reducers'
import { retrySave, cancelSave } from './../actions/todo';

const TodoItem = ({ todo, onSelect, onRemove, failedUpdate, failedSave, retrySave, cancelSave }) => (
  <div style={{
    backgroundColor: (() => {
      if (failedUpdate) {
        return '#ffcac7';
      }

      if (todo.__optimistic) {
        return '#c0f3ff';
      }

      return 'transparent';
    })()
  }}>
    <span onClick={() => onSelect(todo)}>{todo.title}</span>
    <button onClick={() => onRemove(todo)}>X</button>

    {
      failedUpdate && failedSave && (
        <span>
          <button onClick={() => retrySave(todo.id)}>Retry save</button>
          <button onClick={() => cancelSave(todo.id)}>Cancel save</button>
        </span>
      )
    }
  </div>
)

const TodoItemContainer = ({ todo, ...props }) => {
  if (todo) {
    return <TodoItem todo={todo} {...props} />
  }

  return null
}

export default connect(
  (state, props) => {
    const todo = todoSelectors.getById(state, props.todoId)

    if (!todo) {
      return {}
    }

    return {
      todo,
      failedUpdate: (todo.__refs || []).map(ref => fetchSelectors.getHasFailed(state, ref)).includes(true),
      failedSave: (todo.__refs || []).includes(`TODO_${todo.id}/SAVE`)
    }
  },
  { retrySave, cancelSave }
)(TodoItemContainer)