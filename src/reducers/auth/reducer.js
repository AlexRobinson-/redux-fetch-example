import { createMultiReducer } from 'alexs-redux-helpers/reducers'
import { successType } from 'alexs-redux-fetch/fetch';
import {
  LOGIN,
  LOGOUT
} from './../../refs';

const reducer = createMultiReducer({
  id: {
    initial: null,
    [successType(LOGIN)]: (_, action) => action.payload.userId,
    [successType(LOGOUT)]: null
  },
  isLoggedIn: {
    initial: false,
    [successType(LOGIN)]: true,
    [successType(LOGOUT)]: false
  }
});

export default reducer;

export const getIsLoggedIn = state => state.isLoggedIn;
export const getUserId = state => state.id;
