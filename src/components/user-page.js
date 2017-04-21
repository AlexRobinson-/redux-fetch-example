import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchUser } from './../actions/user';
import UserProfile from './user-profile/user-profile';

class UserPage extends Component {
  componentWillMount() {
    this.props.fetchUser(this.props.userId)
  }

  render() {
    return (
      <UserProfile
        userId={this.props.userId}
      />
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