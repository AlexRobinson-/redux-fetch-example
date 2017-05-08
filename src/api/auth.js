import { normalize } from 'normalizr';
import { attemptLogin } from './../fake-server/users';
import User from './../schemas/user';
import api from './api';

export const login = (username, password) => api(false)
  .then(() => attemptLogin(username, password))
  .then(({ error, user }) => error ? { error } : { response: { ...normalize(user, User), userId: user.id } })
  .catch(error => ({ error: error.message }))

export const logout = () => api()
  .then(response => ({ response }))
  .catch(error => ({ error: error.message }))