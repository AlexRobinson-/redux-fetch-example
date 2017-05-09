import React from 'react';
import { connect } from 'react-redux';
import { authSelectors } from './reducers';
import GuestApp from './components/guest-app';
import UserApp from './components/user-app';

const App = ({ isLoggedIn }) => (
  isLoggedIn
    ? <UserApp />
    : <GuestApp />
)

export default connect(
  state => {
    return {
      isLoggedIn: authSelectors.getIsLoggedIn(state)
    }
  }
)(App);
