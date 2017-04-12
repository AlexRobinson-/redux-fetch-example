import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { connect } from 'react-redux';
import { Switch, Route, Link } from 'react-router-dom';
import AccountPage from './account-page';
import UsersPage from './users-page';
import UserPage from './user-page';
import { logout } from './../actions/auth';

const UserApp = ({ logout }) => (
  <Router>
    <div>
      <h1>Todo List</h1>
      <button onClick={() => logout()}>Logout</button>

      <Link to='/'>Home</Link>
      <Link to='/users'>users</Link>

      <Switch>
        <Route
          exact
          path='/'
          component={AccountPage}
        />
        <Route
          exact
          path='/users'
          component={UsersPage}
        />
        <Route
          exact
          path='/users/:userId'
          component={UserPage}
        />
      </Switch>
    </div>
  </Router>
);

export default connect(
  state => ({}),
  { logout }
)(UserApp)