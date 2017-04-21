import React from 'react';
import { connect } from 'react-redux';
import TodoForm from './todo-form';
import UserProfile from './user-profile/user-profile';
import { authSelectors } from './../reducers';

const AccountPage = ({ accountId }) => (
  <UserProfile userId={accountId}/>
)

export default connect(
  state => ({
    accountId: authSelectors.getUserId(state)
  })
)(AccountPage)
