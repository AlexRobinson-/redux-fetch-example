import {
  LOGIN_ATTEMPT,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  LOGOUT
} from './../constants';
import action from './../redux-helpers/utils/actions/action';
import { fetchAction } from './../redux-helpers/modules/fetch/actions';
import * as authApi from './../api/auth';

export const login = (username, password) => async dispatch => {
  const { response, error } = await dispatch(fetchAction('LOGIN', authApi.login(username, password)))

  if (error) {
    return;
  }

  dispatch(action(LOGIN_SUCCESS, { userId: response.userId }))
}

export const login_old = (username, password) => async dispatch => {
  dispatch(action(LOGIN_ATTEMPT));

  const { response, error } = await authApi.login(username, password);

  if (error) {
    dispatch(action(LOGIN_FAILED))
    return
  }

  dispatch(action(LOGIN_SUCCESS, { response }))
}

export const logout = () => async dispatch => {
  dispatch(action(LOGOUT));
};
