import { combineReducers } from 'redux';
import nestSelectors from 'alexs-redux-helpers/selectors/nest-selectors';
import { selectors, createEntitySelector } from 'alexs-redux-fetch';
import auth, { selectors as rawAuthSelectors } from './auth';
import entities from './entities';

export default combineReducers({
  entities,
  auth
})

export const todoSelectors = nestSelectors(createEntitySelector('todo'), state => state.entities);
export const userSelectors = nestSelectors(createEntitySelector('user'), state => state.entities);

export const fetchSelectors = nestSelectors(selectors.fetch, state => state.entities);

export const authSelectors = nestSelectors(rawAuthSelectors, state => state.auth);

export const getAccount = state => {
  if (!authSelectors.getIsLoggedIn(state)) {
    return null
  }

  return userSelectors.getById(state, authSelectors.getUserId(state))
}

export const getUsersTodos = (state, id) => {
  const user = userSelectors.getById(state, id)

  if (!user || !Array.isArray(user.todos)) {
    return []
  }

  return user.todos.map(id => todoSelectors.getById(state, id)).filter(Boolean)
}
