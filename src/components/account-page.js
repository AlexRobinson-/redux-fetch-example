import React from 'react';
import { connect } from 'react-redux';
import TodoForm from './todo-form';
import UserProfile from './user-profile';
import { authSelectors } from './../reducers';

const AccountPage = ({ accountId }) => (
  <div>
    <TodoForm />
    <UserProfile userId={accountId}/>
  </div>
)

export default connect(
  state => ({
    accountId: authSelectors.getUserId(state)
  })
)(AccountPage)
