import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchUsers } from './../actions/user';
import UserList from './users-list';
import { userSelectors } from './../reducers'

class UsersPage extends Component {
  componentWillMount() {
    this.props.fetchUsers()
  }

  render() {
    return (
      <div>
        <h2>Users Page</h2>
        <UserList
          users={this.props.users}
        />
      </div>

    )
  }
}

export default connect(
  state => ({
    users: userSelectors.getAll(state)
  }),
  { fetchUsers }
)(UsersPage);