import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchUsers } from './../actions/user';
import UserList from './users-list';
import { userSelectors, fetchSelectors } from './../reducers'
import { ConnectionStatus } from './status';
import { FETCH_USERS } from './../refs';

class UsersPage extends Component {
  componentWillMount() {
    this.props.fetchUsers();
  }

  render() {
    return (
      <div>
        <h2>Users Page</h2>
        <ConnectionStatus
          status={this.props.fetchStatus}
          onRetry={this.props.fetchUsers}
          error={this.props.error}
        >
          <UserList users={this.props.users} />
        </ConnectionStatus>
      </div>
    )
  }
}

export default connect(
  state => ({
    users: userSelectors.getAll(state),
    fetchStatus: fetchSelectors.getStatus(state, FETCH_USERS),
    failed: fetchSelectors.getHasFailed(state, FETCH_USERS),
    error: fetchSelectors.getErrorMessage(state, FETCH_USERS)
  }),
  { fetchUsers }
)(UsersPage);