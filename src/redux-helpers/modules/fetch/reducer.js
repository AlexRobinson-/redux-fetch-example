import createTree from '../../utils/reducers/create-tree';
import createDynamicReducer from '../../utils/reducers/create-dynamic-reducer';
import {
  NOT_LOADED,
  FETCHING,
  LOADED,
  FAILED,
  FETCH_REQUEST,
  FETCH_SUCCESS,
  FETCH_FAILURE,
  SLOW_CONNECTION
} from './constants';

export default createTree({
  status: createDynamicReducer({
    initial: NOT_LOADED,
    [FETCH_REQUEST]: [action => action.payload.ref, FETCHING],
    [FETCH_SUCCESS]: [action => action.payload.ref, LOADED],
    [FETCH_FAILURE]: [action => action.payload.ref, FAILED]
  }),
  failedCount: createDynamicReducer({
    initial: 0,
    [FETCH_SUCCESS]: [action => action.payload.ref, 0],
    [FETCH_FAILURE]: [action => action.payload.ref, state => state + 1]
  }),
  slow: createDynamicReducer({
    initial: null,
    [SLOW_CONNECTION]: [action => action.payload.ref, true],
    [FETCH_REQUEST]: [action => action.payload.ref, null],
    [FETCH_SUCCESS]: [action => action.payload.ref, null],
    [FETCH_FAILURE]: [action => action.payload.ref, null]
  })
});

const getIsLoading = ({ status }, ref) => {
  return !!status[ref] && status[ref] === FETCHING
}

const getIsFailing = (state, ref) => {
  const { status, failedCount } = state

  if (!status[ref]) {
    return false;
  }

  if (state[ref] === NOT_LOADED || state[ref] === LOADED) {
    return false;
  }

  if (!failedCount[ref]) {
    return false;
  }

  return failedCount[ref] > 0;
}

const getIsSlow = (state, ref) => {
  if (!getIsLoading(state, ref)) {
    return false;
  }

  return !!state.slow[ref];
}

const getFailedAttempts = (state, ref) => {
  return state.failedCount[ref] || 0
}

const getHasFailed = (state, ref) => state.status[ref] === FAILED && getFailedAttempts(state, ref) >= 3

export const selectors = {
  getIsLoading,
  getIsFailing,
  getIsSlow,
  getFailedAttempts,
  getHasFailed
}
