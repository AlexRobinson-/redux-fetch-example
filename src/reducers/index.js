import { combineReducers } from 'redux';
import nestSelectors from 'alexs-redux-helpers/selectors/nest-selectors';
import { createFetchSelectors, createEntitySelectors, entitySelectors } from 'alexs-redux-fetch';
import auth, { selectors as rawAuthSelectors } from './auth';
import api from './api';

export default combineReducers({
  api,
  auth
})

const getIsFresh = (state, entityName, id) => {
  const timestamp = entitySelectors.getTimestamp(state, entityName, id);

  if (!timestamp) return false;

  return Date.now() - timestamp < 5000;
}

const customEntitySelectors = {
  ...entitySelectors,
  getIsFresh
}

export const todoSelectors = createEntitySelectors('todo', state => state.api, customEntitySelectors);
export const userSelectors = createEntitySelectors('user', state => state.api, customEntitySelectors);

export const fetchSelectors = createFetchSelectors(state => state.api);

export const authSelectors = nestSelectors(rawAuthSelectors, state => state.auth);

export const getAccount = (state, withOptimistic = true) => {
  if (!authSelectors.getIsLoggedIn(state)) {
    return null
  }

  return userSelectors.getById(state, authSelectors.getUserId(state), withOptimistic)
}

export const getUsersTodos = (state, id) => {
  const user = userSelectors.getById(state, id)

  if (!user || !Array.isArray(user.todos)) {
    return []
  }

  return user.todos.map(id => todoSelectors.getById(state, id)).filter(Boolean)
}

export const getIsApiFresh = (state, ref) => {
  const timestamp = fetchSelectors.getTimestamp(state, ref);

  console.log('checking fresh', Date.now() - timestamp < 5000, Date.now() - timestamp, timestamp)

  return Date.now() - timestamp < 5000;
}