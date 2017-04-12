import { schema, normalize } from 'normalizr';
import * as todoServer from './../fake-server/todos';

const delay = (timeout = 1000) => new Promise(
  res => {
    setTimeout(res, timeout)
  }
)

const { Entity } = schema;

export const Todo = new Entity('todo');

export const fetchTodos = () => delay()
  .then(() => todoServer.getTodos())
  .then(response => normalize(response, [Todo]))
  .then(response => ({ response }))

export const fetchTodo = id => delay()
  .then(() => todoServer.getTodo(id))
  .then(response => normalize(response, Todo))
  .then(response => ({ response }))

export const createTodo = (userId, todo) => delay()
  .then(() => todoServer.createTodo(userId, todo))
  .then(response => normalize(response, Todo))
  .then(response => ({ response }))

export const saveTodo = (id, fields) => delay()
  .then(() => todoServer.updateTodo(id, fields))
  .then(response => normalize(response, Todo))
  .then(response => ({ response }))