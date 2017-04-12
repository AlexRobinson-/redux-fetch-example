import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchUser } from './../actions/user';
import UserProfile from './user-profile';

class UserPage extends Component {
  componentWillMount() {
    this.props.fetchUser(this.props.userId)
  }

  render() {
    return (
      <div>
        <h2>User Page</h2>
        <UserProfile
          userId={this.props.userId}
        />
      </div>

    )
  }
}

export default connect(
  (state, ownProps) => {
    return {
      userId: ownProps.match.params.userId
    }
  },
  { fetchUser }
)(UserPage);