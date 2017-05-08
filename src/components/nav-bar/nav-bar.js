import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from './../../actions/auth';
import './nav-bar.css';

const NavBar = ({ logout }) => (
  <div className='NavBar'>
    <div>
      <div><Link to='/'>Home</Link></div>
      <div><Link to='/users'>users</Link></div>
    </div>
    <div>
      <div>
        <button onClick={() => logout()}>Logout</button>
      </div>
    </div>
  </div>
)

export default connect(
  undefined,
  { logout }
)(NavBar)