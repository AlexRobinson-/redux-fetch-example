import React from 'react';
import { connect } from 'react-redux';
import TodoList from './todo-list';
import { userSelectors, authSelectors, getUsersTodos } from './../reducers';
import { beginEditing } from './../actions/todo';

const UserProfile = ({ user, todos, isAccount, beginEditing }) => (
  <div>
    <h2>User Profile</h2>

    <TodoList
      todos={todos}
      onSelect={todo => {
        if (isAccount) {
          beginEditing(todo);
        }
      }}
    />
  </div>
)

export default connect(
  (state, ownProps) => {
    const user = userSelectors.getById(state, ownProps.userId)
    const todos = getUsersTodos(state, ownProps.userId)

    return {
      user,
      todos,
      isAccount: authSelectors.getUserId(state) === ownProps.userId
    }
  },
  { beginEditing }
)(UserProfile)