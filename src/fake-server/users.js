import { getTodo } from './todos';

const users = {
  1: {
    id: 1,
    username: 'test',
    password: '123',
    todos: [1, 2]
  },
  2: {
    id: 2,
    username: 'someone',
    password: '123',
    todos: [3, 4]
  }
}

const usernames = {
  test: 1,
  someone: 2
}

let latestId = 1;

export const createUser = (fields) => {
  const id = ++latestId;
  users[id] = {
    ...fields,
    id
  }

  return users[id]
}


export const getUser = id => {
  const user = users[id]

  const response = { ...user, todos: user.todos.map(id => getTodo(id)), password: undefined }

  return response
}

export const getUsers = () => Object.keys(users).map(getUser);

export const updateUser = (id, fields) => {
  users[id] = fields
}

export const attemptLogin = (username, password) => {
  const id = usernames[username]

  if (!id || !users[id].password === password) {
    return { error: 'Account or password is not correct' }
  }

  return { user: getUser(id) }
}