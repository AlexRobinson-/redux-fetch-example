import { getIsApiFresh } from './../reducers';

export const whenNotFresh = (ref, actionCreator) => (dispatch, getState) => {
  if (!getIsApiFresh(getState(), ref)) {
    dispatch(actionCreator());
  }
}