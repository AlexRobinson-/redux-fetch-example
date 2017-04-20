import { normalize } from 'normalizr';
import { createEditActions } from './../redux-helpers/modules/entities/actions';
import * as todoApi from '../api/todo';
import { fetchAction } from './fetch';
import { authSelectors, todoSelectors, getAccount } from './../reducers';
import { cancelOptimisticUpdate } from './../redux-helpers/modules/fetch/actions'
import { CREATE_TODO, REMOVE_TODO, FETCH_TODOS, FETCH_TODO } from './../constants';
import { User } from './../api/user'

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


export const removeTodo = id => (dispatch, getState) => dispatch(
  fetchAction(
    REMOVE_TODO,
    todoApi.removeTodo(id, authSelectors.getUserId(getState()))
  )
)

export const retrySave = id => (dispatch, getState) => {
  dispatch(saveTodo(id, todoSelectors.getItemUpdateForRef(getState(), id, `TODO_${id}/SAVE`)))
}

export const cancelSave = id => cancelOptimisticUpdate(`TODO_${id}/SAVE`)

export const {
  beginEditing,
  beginNew,
  update,
  stopEditing
} = createEditActions('todo')