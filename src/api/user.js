import { schema, normalize } from 'normalizr';
import { getUsers, getUser } from './../fake-server/users';
import { Todo } from './todo';

const delay = (timeout = 1000) => new Promise(
  res => {
    setTimeout(res, timeout)
  }
)

const { Entity } = schema;

export const User = new Entity('user', {
  todos: [Todo]
});

export const fetchUsers = () => delay()
  .then(() => getUsers())
  .then(response => normalize(response, [User]))
  .then(response => ({ response }))

export const fetchUser = id => delay()
  .then(() => getUser(id))
  .then(response => normalize(response, User))
  .then(response => ({ response }))