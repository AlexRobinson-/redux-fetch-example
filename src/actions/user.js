import { fetchAction } from './fetch';
import * as userApi from './../api/user';

export const fetchUsers = () => fetchAction('FETCH_USERS', userApi.fetchUsers())
export const fetchUser = id => fetchAction('FETCH_USER', userApi.fetchUser(id))