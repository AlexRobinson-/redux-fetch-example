import { combineReducers } from 'redux';
import nestSelectors from './../utils/selectors/nest-selectors';

import fetch, { selectors as rawFetchSelectors } from './fetch';
import entities, {
  selectors as rawEntitySelectors,
  createEntitySelector as rawCreateEntitySelector,
  createEntityReducer as rawCreateEntityReducer
} from './entities';

export default combineReducers({
  fetch,
  entities: (state, action) => entities(state, action)
})

export const createEntityReducer = reducers => combineReducers({
  fetch,
  entities: rawCreateEntityReducer(reducers)
})


export const fetchSelectors = nestSelectors(rawFetchSelectors, state => state.fetch);
export const entitySelectors = nestSelectors(rawEntitySelectors, state => state.entities);

export const createEntitySelector = function () {
  return nestSelectors(rawCreateEntitySelector.apply(null, arguments), state => state.entities);
}
