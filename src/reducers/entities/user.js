import { fetchSuccessType } from 'alexs-redux-fetch/fetch';
import { updateEntity } from 'alexs-redux-fetch/entities/helpers';
import { CREATE_TODO, REMOVE_TODO } from './../../constants';

export default (state = {}, action) => {
  switch (action.type) {
    case fetchSuccessType(CREATE_TODO):
      return updateEntity(state, action.payload.userId, user => ({
        ...user,
        todos: [
          ...user.todos,
          action.payload.result
        ]
      }))
    case fetchSuccessType(REMOVE_TODO):
      return updateEntity(state, action.payload.userId, user => ({
        ...user,
        todos: user.todos.filter(id => id !== action.payload.todoId)
      }))
    default:
      return state
  }
}