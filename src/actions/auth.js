import action from 'alexs-redux-helpers/actions';
import { LOGOUT } from './../constants';
import { fetchAction } from './fetch';
import * as authApi from './../api/auth';

export const login = (username, password) => fetchAction('LOGIN', authApi.login(username, password))

export const logout = () => action(LOGOUT);
