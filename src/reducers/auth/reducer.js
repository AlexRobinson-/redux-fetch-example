import { createTree } from 'alexs-redux-helpers/reducers'
import {
  LOGIN_SUCCESS,
  LOGOUT
} from './../../constants';

const reducer = createTree({
  id: {
    initial: null,
    [LOGIN_SUCCESS]: (_, action) => action.payload.userId,
    [LOGOUT]: null
  },
  isLoggedIn: {
    initial: false,
    [LOGIN_SUCCESS]: true,
    [LOGOUT]: false
  }
});

export default reducer;

export const getIsLoggedIn = state => state.isLoggedIn;
export const getUserId = state => state.id;
