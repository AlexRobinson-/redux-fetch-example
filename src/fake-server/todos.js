import { getUser, updateUser, getUsers } from './users';

const todos = {
  1: {
    title: 'Do something',
    id: 1,
  },
  2: {
    title: 'Do something again',
    id: 2,
  },
  3: {
    title: 'Do stuff',
    id: 3,
  },
  4: {
    title: 'Do stuff again',
    id: 4,
  }
}

let latestId = 4;

export const createTodo = (userId, fields) => {
  const id = ++latestId;

  todos[id] = {
    ...fields,
    id
  }

  const user = getUser(userId)

  console.log('user on server', user)
  updateUser(userId, {
    ...user,
    todos: [
      ...(user.todos || []).map(todo => todo.id),
      id
    ]
  })

  return todos[id]
}

export const removeTodo = id => {
  delete todos[id];

  const users = getUsers()

  users.forEach(user => {
    if (user.todos.indexOf(id) >= 0) {
      updateUser(user.id, {
        ...user,
        todos: user.todos.filter(todoId => todoId !== id)
      })
    }
  })
}

export const getTodos = () => Object.values(todos);

export const getTodo = id => todos[id]

export const updateTodo = (id, fields) => {
  todos[id] = {
    ...fields,
    id
  };

  return todos[id];
}