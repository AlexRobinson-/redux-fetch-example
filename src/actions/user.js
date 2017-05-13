import { fetchAction } from 'alexs-redux-fetch/fetch/actions';
import * as userApi from './../api/user';
import { FETCH_USERS, getFetchUserRef } from './../refs';
import { userSelectors } from './../reducers/selectors';
import { whenNotFresh } from './api';

// Only run callback if we don't have user data or if the data is old
const whenUserNotFresh = (id, callback) => (dispatch, getState) => {
  if (!userSelectors.getIsFresh(getState(), id)) {
    dispatch(callback());
  }
}

export const fetchUsers = () => whenNotFresh(
  FETCH_USERS,
  () => fetchAction(FETCH_USERS, userApi.fetchUsers())
)

export const fetchUser = id => whenUserNotFresh(
  id,
  () => fetchAction(getFetchUserRef(id), userApi.fetchUser(id))
)