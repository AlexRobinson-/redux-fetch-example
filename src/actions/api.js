import { fetchSelectors } from './../reducers/selectors';

// Only dispatch actionCreator if the api hasn't been called recently
export const whenNotFresh = (ref, actionCreator) => (dispatch, getState) => {
  if (!fetchSelectors.getIsApiFresh(getState(), ref)) {
    dispatch(actionCreator());
  }
}