import { combineReducers } from 'redux';
import modules, { fetchSelectors as rawFetchSelectors, createEntitySelector } from './../redux-helpers/modules';
import nestSelectors from './../redux-helpers/utils/selectors/nest-selectors';
import auth, { selectors as rawAuthSelectors } from './auth';

export default combineReducers({
  modules,
  auth
})

export const todoSelectors = nestSelectors(createEntitySelector('todo'), state => state.modules);
export const userSelectors = nestSelectors(createEntitySelector('user'), state => state.modules);

export const fetchSelectors = nestSelectors(rawFetchSelectors, state => state.modules);

export const authSelectors = nestSelectors(rawAuthSelectors, state => state.auth);

export const getAccount = state => {
  if (!authSelectors.isLoggedIn(state)) {
    return null
  }

  return userSelectors.getById(state, authSelectors.getUserId(state))
}


export const getUsersTodos = (state, id) => {
  const user = userSelectors.getById(state, id)

  if (!user || !Array.isArray(user.todos)) {
    return []
  }

  return user.todos.map(id => todoSelectors.getById(state, id))
}
