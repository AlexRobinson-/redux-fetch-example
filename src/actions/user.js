import { fetchAction } from './../redux-helpers/modules/fetch/actions';
import * as userApi from './../api/user';

export const fetchUsers = () => fetchAction('FETCH_USERS', userApi.fetchUsers())
export const fetchUser = id => fetchAction('FETCH_USER', userApi.fetchUser(id))