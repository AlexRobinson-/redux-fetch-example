import { schema } from 'normalizr';

const { Entity } = schema;

const Todo = new Entity('todo');

export default Todo;