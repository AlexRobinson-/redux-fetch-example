import React from 'react';
import { connect } from 'react-redux';
import TodoList from '../todo-list/todo-list';
import TodoForm from '../todo-form';
import Container from './../container';
import { userSelectors, authSelectors, fetchSelectors } from './../../reducers/selectors';
import { beginEditing, removeTodo } from '../../actions/todo';
import './user-profile.css';

const UserProfile = ({ user, todos, isAccount, beginEditing, removeTodo }) => (
  <Container className='UserProfile'>
    <h2>User | {user.username}</h2>

    { isAccount && <TodoForm /> }

    <TodoList
      todos={todos}
      isAccount={isAccount}
      onSelect={todo => {
        if (isAccount) {
          beginEditing(todo);
        }
      }}
    />
  </Container>
)

export default connect(
  (state, ownProps) => {
    const user = userSelectors.getById(state, ownProps.userId)
    const todos = userSelectors.getTodos(state, ownProps.userId)
    const fetchStatus = fetchSelectors.getStatus(state, 'FETCH_TODOS')

    return {
      user,
      todos,
      isAccount: authSelectors.getUserId(state) === +ownProps.userId,
      fetchStatus
    }
  },
  { beginEditing, removeTodo }
)(UserProfile)