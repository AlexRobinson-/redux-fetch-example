import { normalize } from 'normalizr';
import { attemptLogin } from './../fake-server/users';
import User from './../schemas/user';
import api from './api';

export const login = (username, password) => api(false)
  .then(() => attemptLogin(username, password))
  .then(({ error, user }) => {
    if (error) {
      return error
    }

    return { ...normalize(user, User), userId: user.id }
  })

export const logout = () => api();