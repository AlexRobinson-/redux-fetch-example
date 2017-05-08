import { normalize } from 'normalizr';
import * as todoServer from './../fake-server/todos';
import { Todo } from './../schemas';
import api from './api';

export const fetchTodos = () => api()
  .then(() => todoServer.getTodos())
  .then(response => normalize(response, [Todo]))
  .then(response => ({ response }))
  .catch(error => ({ error: error.message }))

export const fetchTodo = id => api()
  .then(() => todoServer.getTodo(id))
  .then(response => normalize(response, Todo))
  .then(response => ({ response }))
  .catch(error => ({ error: error.message }))

export const createTodo = (userId, todo) => api()
  .then(() => todoServer.createTodo(userId, todo))
  .then(response => ({ ...normalize(response, Todo), userId }))
  .then(response => ({ response }))
  .catch(error => ({ error: error.message }))

export const saveTodo = (id, fields) => api()
  .then(() => todoServer.updateTodo(id, fields))
  .then(response => normalize(response, Todo))
  .then(response => ({ response }))
  .catch(error => ({ error: error.message }))

export const removeTodo = (todoId, getAccount) => api()
  .then(() => todoServer.removeTodo(todoId))
  .then(response => ({ response }))
  .catch(error => ({ error: error.message }))

export default {
  fetchTodos,
  fetchTodo,
  createTodo,
  saveTodo,
  removeTodo
}