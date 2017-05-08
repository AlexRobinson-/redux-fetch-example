import { schema } from 'normalizr';
import Todo from './todo';

const { Entity } = schema;

export const User = new Entity('user', {
  todos: [Todo]
});

export default User;