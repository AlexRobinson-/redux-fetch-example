import { fetchAction } from './../redux-helpers/modules/fetch/actions';
import { createEditActions } from './../redux-helpers/modules/entities/actions';
import * as todoApi from '../api/todo';
import { authSelectors } from './../reducers';

export const fetchTodos = () => fetchAction('FETCH_TODOS', todoApi.fetchTodos())
export const fetchTodo = id => fetchAction('FETCH_TODOS', todoApi.fetchTodo(id))
export const createTodo = todo => (dispatch, getState) => {
  dispatch(fetchAction('CREATE_TODO', todoApi.createTodo(authSelectors.getUserId(getState()), todo)))
}
export const saveTodo = (id, fields) => fetchAction('SAVE_TODO', todoApi.saveTodo(id, fields))

export const {
  beginEditing,
  beginNew,
  update,
  stopEditing
} = createEditActions('todo')