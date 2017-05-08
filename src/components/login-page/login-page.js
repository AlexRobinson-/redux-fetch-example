import React, { Component } from 'react';
import { connect } from 'react-redux';
import { login } from './../../actions/auth';
import { fetchSelectors } from './../../reducers';
import { LOGIN } from './../../refs';
import './login-page.css';

class LoginPage extends Component {
  state = {
    username: '',
    password: ''
  }

  render() {

    if (this.props.loginPending) {
      return <div className="LoginPage">Logging in...</div>
    }

    return (
      <div className='LoginPage'>
        <h1>Login</h1>

        {
          this.props.loginFailed && (
            <div>{this.props.error}</div>
          )
        }

        <div>
          <div className='LoginPage_InputGroup'>
            <label>Username</label>
            <input value={this.state.username} onChange={e => this.setState({ username: e.target.value })} />
          </div>

          <div className='LoginPage_InputGroup'>
            <label>Password</label>
            <input value={this.state.password} onChange={e => this.setState({ password: e.target.value })} />
          </div>

          <button onClick={() => this.props.login(this.state.username, this.state.password)}>Login</button>
        </div>
      </div>
    )
  }
}

export default connect(
  state => ({
    loginFailed: fetchSelectors.getHasFailed(state, LOGIN),
    loginPending: fetchSelectors.getIsPending(state, LOGIN),
    error: fetchSelectors.getErrorMessage(state, LOGIN)
  }),
  { login }
)(LoginPage)