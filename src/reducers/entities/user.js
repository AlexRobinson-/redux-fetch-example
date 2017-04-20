import { CREATE_TODO, REMOVE_TODO } from './../../constants';
import { fetchSuccessType } from './../../redux-helpers/modules/fetch';
import { updateEntity } from './../../redux-helpers/modules/entities/helpers';

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