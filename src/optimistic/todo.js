import { normalize } from 'normalizr';
import { getAccount } from './../reducers';
import { User, Todo } from './../schemas'

export const optimisticCreateTodo = (state, todo) => {
  const account = getAccount(state, false);
  return normalize({
    id: account.id,
    todos: [
      ...account.todos,
      { ...todo, id: 'optimistic-todo' }
    ]
  }, User).entities;
}

export const optimisticSaveTodo = (id, fields) => normalize({ ...fields, id }, Todo).entities

export default {
  createTodo: optimisticCreateTodo,
  saveTodo: optimisticSaveTodo
}