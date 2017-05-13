import { action } from 'alexs-redux-helpers/actions';
import { createEditActions, cancelOptimisticUpdate } from 'alexs-redux-fetch/entities/actions';
import { fetchAction } from 'alexs-redux-fetch/fetch/actions';
import { REMOVE_TODO_FROM_LOCAL_USER } from './action-types';
import { authSelectors, todoSelectors } from './../reducers/selectors';
import * as refs from './../refs';
import todoApi from '../api/todo';
import todoOptimistic from './../optimistic/todo';

export const {
  beginEditing,
  beginNew,
  update,
  stopEditing
} = createEditActions('todo');

export const fetchTodos = () => fetchAction(refs.FETCH_TODOS, todoApi.fetchTodos());

export const fetchTodo = id => fetchAction(refs.getFetchTodoRef(id), todoApi.fetchTodo(id));

export const createTodo = todo => (dispatch, getState) => dispatch(
  fetchAction(
    refs.CREATE_TODO,
    todoApi.createTodo(authSelectors.getUserId(getState()), todo),
    todoOptimistic.createTodo(getState(), todo)
  )
);

export const retryCreate = () => (dispatch, getState) => dispatch(
  createTodo(todoSelectors.getItemUpdateForRef(getState(), refs.OPTIMISTIC_TODO_ID, refs.CREATE_TODO))
);

export const cancelCreate = () => cancelOptimisticUpdate(refs.CREATE_TODO);

export const saveTodo = (id, fields) => fetchAction(
  refs.getSaveTodoRef(id),
  todoApi.saveTodo(id, fields),
  todoOptimistic.saveTodo(id, fields)
);

export const retrySave = id => (dispatch, getState) => dispatch(
  saveTodo(
    id,
    todoSelectors.getItemUpdateForRef(getState(), id, refs.getSaveTodoRef(id))
  )
);

export const cancelSave = id => cancelOptimisticUpdate(refs.getSaveTodoRef(id));

const cancelAllOptimisticUpdates = id => (dispatch, getState) => {
  const ref = refs.getSaveTodoRef(id);

  dispatch(cancelOptimisticUpdate(ref))
};

// This is required to remove the todo id from the local user object
const removeTodoFromUserLocally = (userId, todoId) => action(REMOVE_TODO_FROM_LOCAL_USER, { userId, todoId });

export const removeTodo = id => (dispatch, getState) => {
  if (id === refs.OPTIMISTIC_TODO_ID) {
    dispatch(cancelOptimisticUpdate(refs.CREATE_TODO))
    return;
  }

  dispatch(cancelAllOptimisticUpdates(id))

  if ((todoSelectors.getEditable(getState()) || {}).id === id) {
    dispatch(stopEditing(id))
  }

  dispatch(
    fetchAction(
      refs.getRemoveTodoRef(id),
      todoApi
        .removeTodo(id)
        .then(res => {
          if (res.error === undefined) {
            // remove todo from local user on success
            dispatch(removeTodoFromUserLocally(authSelectors.getUserId(getState()), id));
          }
          return res;
        })
    )
  )
}

export const cancelRemove = id => cancelOptimisticUpdate(refs.getRemoveTodoRef(id));
