import React from 'react';
import { connect } from 'react-redux';
import { fetchSelectors } from './../../reducers'
import * as refs from './../../refs';
import {
  removeTodo,
  cancelRemove,
  retrySave,
  cancelSave,
  retryCreate,
  cancelCreate
} from './../../actions/todo';
import FailedTodoControls from './failed-todo-controls';
import RegularTodoControls from './regular-todo-controls';

const TodoControls = ({ todoId, hasFailed, failMessage, retryAction, cancelAction, dispatch, pendingMessage }) => {
  if (pendingMessage) {
    return (
      <div>{pendingMessage}</div>
    )
  }

  if (hasFailed) {
    return (
      <FailedTodoControls
        failMessage={failMessage}
        retryAction={() => dispatch(retryAction())}
        cancelAction={() => dispatch(cancelAction())}
      />
    );
  }

  return (
    <RegularTodoControls
      todoId={todoId}
    />
  )
};

export default connect(
  (state, props) => {
    const id = props.todoId;

    if (fetchSelectors.getIsPending(state, refs.getRemoveTodoRef(id))) {
      return {
        pendingMessage: 'Removing...'
      }
    }

    if (fetchSelectors.getIsPending(state, refs.getSaveTodoRef(id))) {
      return {
        pendingMessage: 'Saving...'
      }
    }

    if (fetchSelectors.getIsPending(state, refs.CREATE_TODO) && id === refs.OPTIMISTIC_TODO_ID) {
      return {
        pendingMessage: 'Creating...'
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

    if (fetchSelectors.getHasFailed(state, refs.getSaveTodoRef(id))) {
      return {
        hasFailed: true,
        failMessage: 'Failed saving',
        retryAction: () => retrySave(id),
        cancelAction: () => cancelSave(id)
      }
    }

    if (fetchSelectors.getHasFailed(state, refs.CREATE_TODO) && id === refs.OPTIMISTIC_TODO_ID) {
      return {
        hasFailed: true,
        failMessage: 'Failed creating',
        retryAction: retryCreate,
        cancelAction: cancelCreate
      }
    }

    return {
      hasFailed: false
    }
  }
)(TodoControls)