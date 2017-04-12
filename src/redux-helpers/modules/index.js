import { combineReducers } from 'redux';
import nestSelectors from './../utils/selectors/nest-selectors';

import fetch, { selectors as rawFetchSelectors } from './fetch';
import entities, { selectors as rawEntitySelectors, createEntitySelector as rawCreateEntitySelector } from './entities';

export default combineReducers({
  fetch,
  entities
})

export const fetchSelectors = nestSelectors(rawFetchSelectors, state => state.fetch);
export const entitySelectors = nestSelectors(rawEntitySelectors, state => state.entities);

export const createEntitySelector = function () {
  return nestSelectors(rawCreateEntitySelector.apply(null, arguments), state => state.entities);
}
