import nestSelectors from 'alexs-redux-helpers/selectors/nest-selectors';
import { createFetchSelectors, createEntitySelectors, entitySelectors } from 'alexs-redux-fetch';
import { selectors as rawAuthSelectors } from './auth';
import { getApiState, getAuthState } from './index';

// Checks if the entity has been updated recently
const getIsFresh = (state, entityName, id) => {
  const timestamp = entitySelectors.getTimestamp(state, entityName, id);

  if (!timestamp) return false;

  return Date.now() - timestamp < 5000;
}

// Add our custom entity selector to the entity selectors
const customEntitySelectors = {
  ...entitySelectors,
  getIsFresh
}

const todoSelectors = createEntitySelectors('todo', getApiState, customEntitySelectors);
const userSelectors = createEntitySelectors('user', getApiState, customEntitySelectors);
const fetchSelectors = createFetchSelectors(getApiState);
const authSelectors = nestSelectors(rawAuthSelectors, getAuthState);

export const getAccount = (state, withOptimistic = true) => {
  if (!authSelectors.getIsLoggedIn(state)) {
    return null
  }

  return userSelectors.getById(state, authSelectors.getUserId(state), withOptimistic)
}

//  Add selector to get a user's todos
userSelectors.getTodos = (state, id) => {
  const user = userSelectors.getById(state, id)

  if (!user || !Array.isArray(user.todos)) {
    return []
  }

  return user.todos.map(id => todoSelectors.getById(state, id)).filter(Boolean)
}

// Add selectors to check if api has been called recently
fetchSelectors.getIsApiFresh = (state, ref) => {
  const timestamp = fetchSelectors.getTimestamp(state, ref);

  return Date.now() - timestamp < 5000;
}

export {
  todoSelectors,
  userSelectors,
  fetchSelectors,
  authSelectors
}