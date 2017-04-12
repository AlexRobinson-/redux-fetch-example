import { selectors } from './reducers/index';

export const hasEntities = action => action.payload && action.payload.response && action.payload.response.entities;

export const getAllEntities = action => (
  (action.payload && action.payload.response && action.payload.response.entities)
  || {}
);

export const getEntities = (action, entityName) => (
  (action.payload && action.payload.response && action.payload.response.entities && action.payload.response.entities[entityName])
  || {}
);


export const createEntitySelector = (type, baseSelectors = selectors) => Object.keys(baseSelectors).reduce(
  (entitySelectors, selector) => ({
    ...entitySelectors,
    [selector]: (state, ...params) => baseSelectors[selector](state, type, ...params)
  }), baseSelectors
);