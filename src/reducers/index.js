import { combineReducers } from 'redux';
import { fetchSelectors as rawFetchSelectors, createEntitySelector } from './../redux-helpers/modules';
import nestSelectors from './../redux-helpers/utils/selectors/nest-selectors';
import auth, { selectors as rawAuthSelectors } from './auth';
import entities from './entities';
import optimistic from '../redux-helpers/modules/entities/reducers/optimistic';

export default combineReducers({
  entities: (state, action) => {
    console.log(state, action, entities(state, action))
    return entities(state, action)
  },
  auth,
  optimistic
})

export const todoSelectors = nestSelectors(createEntitySelector('todo'), state => state.entities);
export const userSelectors = nestSelectors(createEntitySelector('user'), state => state.entities);

export const fetchSelectors = nestSelectors(rawFetchSelectors, state => state.entities);

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
