import React, { Component } from 'react';
import { connect } from 'react-redux';
import { login } from './../actions/auth';

class GuestApp extends Component {
  state = {
    username: '',
    password: ''
  }

  render() {
    return (
      <div>
        <h1>Login</h1>

        <div>
          <label>Username</label>
          <input value={this.state.username} onChange={e => this.setState({ username: e.target.value })}/>
        </div>

        <div>
          <label>Password</label>
          <input value={this.state.password} onChange={e => this.setState({ password: e.target.value })}/>
        </div>

        <button onClick={() => this.props.login(this.state.username, this.state.password)}>Login</button>
      </div>
    )
  }
}

export default connect(
  undefined,
  { login }
)(GuestApp)