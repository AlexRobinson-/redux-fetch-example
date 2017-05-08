/* Auth */
export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';

/* Todos */
export const FETCH_TODOS = 'TODO/FETCH_ALL';
export const CREATE_TODO = 'TODO/CREATE';

export const getFetchTodoRef = id => `TODO/${id}/FETCH`;
export const getSaveTodoRef = id => `TODO/${id}/SAVE`;
export const getRemoveTodoRef = id => `TODO/${id}/REMOVE`;

export const OPTIMISTIC_TODO_ID = 'optimistic-todo';

/* Users */
export const FETCH_USERS = 'USERS/FETCH_ALL';
export const getFetchUserRef = id => `USER/${id}/FETCH`;
