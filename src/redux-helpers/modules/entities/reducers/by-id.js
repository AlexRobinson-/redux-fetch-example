import { merge } from 'lodash/object';
import { hasEntities } from '../helpers';

const reducer = (state = {}, action) => {
  if (hasEntities(action)) {
    return merge({}, state, action.payload.response.entities)
  }

  return state;
}

export default reducer;

export const getById = (state, type, id) => state[type] && state[type][id];
export const getAll = (state, type, id) => Object.values(state[type] || {});

export const selectors = {
  getById,
  getAll
};
