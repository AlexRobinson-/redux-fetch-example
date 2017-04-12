import { normalize } from 'normalizr';
import { attemptLogin } from './../fake-server/users';
import { User } from './user';

const delay = (timeout = 1000) => new Promise(
  res => {
    setTimeout(res, timeout)
  }
)

export const login = (username, password) => delay()
  .then(() => attemptLogin(username, password))
  .then(response => {
    console.log('response', response)
    return response
  })
  .then(({ error, user }) => error ? { error } : { response: { ...normalize(user, User), userId: user.id } })