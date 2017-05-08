import { successType } from 'alexs-redux-fetch/fetch';
import { updateEntity } from 'alexs-redux-fetch/entities/helpers';
import { CREATE_TODO } from './../../refs';
import { REMOVE_TODO_FROM_LOCAL_USER } from './../../actions/action-types';

export default (state = {}, action) => {
  switch (action.type) {
    case successType(CREATE_TODO):
      return updateEntity(state, action.payload.userId, user => ({
        ...user,
        todos: [
          ...user.todos,
          action.payload.result
        ]
      }))
    case REMOVE_TODO_FROM_LOCAL_USER:
      return updateEntity(state, action.payload.userId, user => ({
        ...user,
        todos: user.todos.filter(id => id !== action.payload.todoId)
      }))
    default:
      return state
  }
}