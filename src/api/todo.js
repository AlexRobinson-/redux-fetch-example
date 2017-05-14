import { normalize } from 'normalizr';
import * as todoServer from './../fake-server/todos';
import { Todo } from './../schemas';
import api from './api';

export const fetchTodos = () => api()
  .then(() => todoServer.getTodos())
  .then(response => normalize(response, [Todo]))

export const fetchTodo = id => api()
  .then(() => todoServer.getTodo(id))
  .then(response => normalize(response, Todo))

export const createTodo = (userId, todo) => api()
  .then(() => todoServer.createTodo(userId, todo))
  .then(response => ({ ...normalize(response, Todo), userId }))

export const saveTodo = (id, fields) => api()
  .then(() => todoServer.updateTodo(id, fields))
  .then(response => normalize(response, Todo))

export const removeTodo = (todoId, getAccount) => api()
  .then(() => todoServer.removeTodo(todoId))

export default {
  fetchTodos,
  fetchTodo,
  createTodo,
  saveTodo,
  removeTodo
}