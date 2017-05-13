import createReducer from 'alexs-redux-helpers/reducers';
import { successType } from 'alexs-redux-fetch/fetch';
import { updateEntity } from 'alexs-redux-fetch/entities/helpers';
import { CREATE_TODO } from './../../refs';
import { REMOVE_TODO_FROM_LOCAL_USER } from './../../actions/action-types';

export default createReducer({
  initial: {},
  [successType(CREATE_TODO)]: (state, action) => updateEntity(state, action.payload.userId,
    user => ({
      ...user,
      todos: [...user.todos, action.payload.result]
    })),
  [REMOVE_TODO_FROM_LOCAL_USER]: (state, action) => updateEntity(state, action.payload.userId,
    user => ({
      ...user,
      todos: user.todos.filter(id => id !== action.payload.todoId)
    }))
});