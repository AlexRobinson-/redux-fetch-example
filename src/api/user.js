import { normalize } from 'normalizr';
import { getUsers, getUser } from './../fake-server/users';
import { User } from './../schemas';
import api from './api';

export const fetchUsers = () => api()
  .then(() => getUsers())
  .then(response => normalize(response, [User]))
  .then(response => ({ response }))
  .catch(error => ({ error: error.message }))

export const fetchUser = id => api()
  .then(() => getUser(id))
  .then(response => normalize(response, User))
  .then(response => ({ response }))
  .catch(error => ({ error: error.message }))