import React from 'react';
import { connect } from 'react-redux';
import { todoSelectors, fetchSelectors } from './../../reducers'
import { retrySave, cancelSave, retryCreate, cancelCreate, removeTodo, cancelRemove } from '../../actions/todo';
import * as refs from './../../refs';

const TodoStatus = ({ hasFailed, failMessage, retryAction, cancelAction, dispatch, isPending, pendingMessage }) => {
  if (hasFailed) {
    return (
      <div>
        {failMessage}
        <button onClick={() => dispatch(retryAction())}>
          Try again
        </button>
        <button onClick={() => dispatch(cancelAction())}>
          Cancel
        </button>
      </div>
    )
  }

  if (isPending) {
    return <div>{pendingMessage}</div>
  }

  return <div>status</div>;
}

export default connect(
  (state, props) => {
    const id = props.todoId;

    const todo = todoSelectors.getById(state, id)

    if (!todo) {
      return {}
    }

    // if new todo and failed creating
    if (id === refs.OPTIMISTIC_TODO_ID) {
      if (fetchSelectors.getHasFailed(state, refs.CREATE_TODO)) {
        return {
          hasFailed: true,
          failMessage: 'Failed creating',
          retryAction: retryCreate,
          cancelAction: cancelCreate
        }
      }

      return {
        isPending: true,
        pendingMessage: 'Creating...'
      }
    }

    if (fetchSelectors.getHasFailed(state, refs.getSaveTodoRef(id))) {
      return {
        hasFailed: true,
        failMessage: 'Failed saving',
        retryAction: () => retrySave(id),
        cancelAction: () => cancelSave(id)
      }
    }

    if (fetchSelectors.getHasFailed(state, refs.getRemoveTodoRef(id))) {
      return {
        hasFailed: true,
        failMessage: 'Failed removing',
        retryAction: () => removeTodo(id),
        cancelAction: () => cancelRemove(id)
      }
    }

    if (fetchSelectors.getIsPending(state, refs.getSaveTodoRef(id))) {
      return {
        isPending: true,
        pendingMessage: 'Creating...'
      }
    }

    if (fetchSelectors.getIsPending(state, refs.getRemoveTodoRef(id))) {
      return {
        isPending: true,
        pendingMessage: 'Removing...'
      }
    }

    return {};
  }
)(TodoStatus);