import React from 'react';
import { connect } from 'react-redux';
import TodoList from '../todo-list/todo-list';
import TodoForm from './../todo-form';
import { userSelectors, authSelectors, getUsersTodos, fetchSelectors } from './../../reducers';
import { beginEditing, removeTodo } from '../../actions/todo';
import './user-profile.css';

const UserProfile = ({ user, todos, isAccount, beginEditing, removeTodo }) => (
  <div className='UserProfile'>
    <h2>User | {user.username}</h2>

    { isAccount && <TodoForm /> }

    <TodoList
      todos={todos}
      onSelect={todo => {
        if (isAccount) {
          beginEditing(todo);
        }
      }}
      onRemove={todo => {
        if (isAccount) {
          removeTodo(todo.id)
        }
      }}
    />
  </div>
)

export default connect(
  (state, ownProps) => {
    const user = userSelectors.getById(state, ownProps.userId)
    const todos = getUsersTodos(state, ownProps.userId)
    const fetchStatus = fetchSelectors.getStatus(state, 'FETCH_TODOS')

    return {
      user,
      todos,
      isAccount: authSelectors.getUserId(state) == ownProps.userId,
      fetchStatus
    }
  },
  { beginEditing, removeTodo }
)(UserProfile)