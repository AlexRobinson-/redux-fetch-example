import React, { Component } from 'react';
import { connect } from 'react-redux';
import UserList from '../users-list/users-list';
import Container from './../container';
import { ConnectionStatus } from './../status';
import { FETCH_USERS } from '../../refs';
import { fetchUsers } from '../../actions/user';
import { userSelectors, fetchSelectors } from './../../reducers'

class UsersPage extends Component {
  componentWillMount() {
    this.props.fetchUsers();
  }

  render() {
    return (
      <Container>
        <h2>Users Page</h2>
        <div>
          <ConnectionStatus
            status={this.props.fetchStatus}
            onRetry={this.props.fetchUsers}
            error={this.props.error}
          >
            <UserList users={this.props.users} />
          </ConnectionStatus>
        </div>
      </Container>
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