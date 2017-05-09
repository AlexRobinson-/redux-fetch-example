import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { connect } from 'react-redux';
import { Switch, Route, Link } from 'react-router-dom';
import UsersPage from './users-page';
import UserPage from './user-page';
import NavBar from './nav-bar';
import { logout } from './../actions/auth';
import { authSelectors } from './../reducers';

const UserApp = ({ logout, accountId }) => (
  <Router>
    <div>
      <NavBar />

      <Switch>
        <Route
          exact
          path='/'
          render={() => <UserPage userId={accountId} />}
        />
        <Route
          exact
          path='/users'
          component={UsersPage}
        />
        <Route
          exact
          path='/users/:userId'
          render={({ match }) => <UserPage userId={match.params.userId} />}
        />
      </Switch>
    </div>
  </Router>
);

export default connect(
  state => ({
    accountId: authSelectors.getUserId(state)
  }),
  { logout }
)(UserApp)