import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchUsers } from './../actions/user';
import UserList from './users-list';
import { userSelectors, fetchSelectors } from './../reducers'
import Loading from './loading';

class UsersPage extends Component {
  componentWillMount() {
    this.props.fetchUsers()
  }

  render() {
    return (
      <div>
        <h2>Users Page</h2>

        <Loading status={this.props.fetchStatus}>
          <UserList
            users={this.props.users}
          />
        </Loading>
      </div>

    )
  }
}

export default connect(
  state => ({
    users: userSelectors.getAll(state),
    fetchStatus: fetchSelectors.getStatus(state, 'FETCH_USERS')
  }),
  { fetchUsers }
)(UsersPage);