import { LOGIN, LOGOUT } from './../refs';
import { fetchAction } from 'alexs-redux-fetch/fetch/actions';
import * as authApi from './../api/auth';

export const login = (username, password) => fetchAction(LOGIN, authApi.login(username, password));

export const logout = () => fetchAction(LOGOUT, authApi.logout());
