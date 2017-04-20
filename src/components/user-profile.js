import React from 'react';
import { connect } from 'react-redux';
import TodoList from './todo-list';
import { userSelectors, authSelectors, getUsersTodos, fetchSelectors } from './../reducers';
import { beginEditing, removeTodo } from './../actions/todo';

const UserProfile = ({ user, todos, isAccount, beginEditing, removeTodo, fetchStatus }) => {
  console.log('todos', todos)
  return (
    <div>
      <h2>User Profile</h2>

      <TodoList
        todos={todos}
        onSelect={todo => {
          if (isAccount) {
            beginEditing(todo);
          }
        }}
        onRemove={todo => {
          console.log('removing')
          if (isAccount) {
            removeTodo(todo.id)
          }
        }}
      />
    </div>
  )
}

export default connect(
  (state, ownProps) => {
    const user = userSelectors.getById(state, ownProps.userId)
    const todos = getUsersTodos(state, ownProps.userId)
    const fetchStatus = fetchSelectors.getStatus(state, 'FETCH_TODOS')

    return {
      user,
      todos,
      isAccount: authSelectors.getUserId(state) === ownProps.userId,
      fetchStatus
    }
  },
  { beginEditing, removeTodo }
)(UserProfile)