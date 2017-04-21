import { normalize } from 'normalizr';
import { createEditActions } from 'alexs-redux-fetch/entities/actions';
import { cancelOptimisticUpdate } from 'alexs-redux-fetch/fetch/actions'
import * as todoApi from '../api/todo';
import { fetchAction } from './fetch';
import { authSelectors, todoSelectors, getAccount, fetchSelectors } from './../reducers';
import { CREATE_TODO, REMOVE_TODO, FETCH_TODOS, FETCH_TODO } from './../constants';
import { User } from './../api/user'

export const {
  beginEditing,
  beginNew,
  update,
  stopEditing
} = createEditActions('todo');
``
export const fetchTodos = () => fetchAction(FETCH_TODOS, todoApi.fetchTodos())

export const fetchTodo = id => fetchAction(FETCH_TODO, todoApi.fetchTodo(id))

export const createTodo = todo => (dispatch, getState) => dispatch(
  fetchAction(
    CREATE_TODO,
    todoApi.createTodo(
      authSelectors.getUserId(getState()),
      todo
    ),
    normalize({
      id: getAccount(getState()).id,
      todos: [
        ...getAccount(getState()).todos,
        { ...todo, id: 'optimistic-todo' }
      ]
    }, User).entities
  )
)

export const saveTodo = (id, fields) => fetchAction(
  `TODO_${id}/SAVE`,
  todoApi.saveTodo(id, fields),
  normalize({ ...fields, id }, todoApi.Todo).entities
)

const cancelAllOptimisticUpdates = id => (dispatch, getState) => {
  if (fetchSelectors.getHasFailed(getState(), `TODO_${id}/SAVE`)) {
    dispatch(cancelOptimisticUpdate(`TODO_${id}/SAVE`))
  }
}

export const removeTodo = id => (dispatch, getState) => {
  if (id === 'optimistic-todo') {
    dispatch(cancelOptimisticUpdate(CREATE_TODO))
    return;
  }

  dispatch(cancelAllOptimisticUpdates(id))

  if (todoSelectors.getEditable(getState()).id === id) {
    dispatch(stopEditing(id))
  }
  dispatch(
    fetchAction(
      REMOVE_TODO,
      todoApi.removeTodo(id, authSelectors.getUserId(getState()))
    )
  )
}

export const retrySave = id => (dispatch, getState) => {
  dispatch(saveTodo(id, todoSelectors.getItemUpdateForRef(getState(), id, `TODO_${id}/SAVE`)))
}

export const cancelSave = id => cancelOptimisticUpdate(`TODO_${id}/SAVE`)
