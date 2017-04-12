import React, { Component } from 'react';
import { connect } from 'react-redux';
import { authSelectors } from './reducers';
import GuestApp from './components/guest-app';
import UserApp from './components/user-app';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        {
          this.props.isLoggedIn
            ? <UserApp />
            : <GuestApp />
        }
      </div>
    );
  }
}

export default connect(
  state => {
    return {
      isLoggedIn: authSelectors.getIsLoggedIn(state)
    }
  }
)(App);
