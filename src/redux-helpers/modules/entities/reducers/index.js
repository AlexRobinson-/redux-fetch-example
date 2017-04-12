import { combineReducers } from 'redux';
import nestSelectors from '../../../utils/selectors/nest-selectors';
import byId, { selectors as byIdSelectors } from './by-id';
import timestamp, { selectors as timestampSelectors } from './timestamp';
import editable, { selectors as editableSelectors } from './editable';

export default combineReducers({
  byId,
  timestamp,
  editable
});

const nestedSelectors = Object.assign({},
  nestSelectors(byIdSelectors, state => state.byId),
  nestSelectors(timestampSelectors, state => state.timestamp),
  nestSelectors(editableSelectors, state => state.editable)
);

const getIsFresh = (state, type, id) => {
  const item = nestedSelectors.getById(state, type, id);

  if (item === undefined) {
    return false;
  }

  const timestamp = nestedSelectors.getTimestamp(state, type, id);

  if (timestamp === undefined) {
    return false;
  }

  return timestamp + (60000) > Date.now()
}

export const selectors = {
  ...nestedSelectors,
  getIsFresh
}
