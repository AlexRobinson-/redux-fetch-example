import React from 'react';
import { Link } from 'react-router-dom';

const UserList = ({ users, onSelect = () => undefined }) => (
  <ul>
    {
      users.map(
        user => (
          <li key={user.id} onClick={() => onSelect(user)}>
            <Link to={`/users/${user.id}`}>{user.username}</Link>
          </li>
        )
      )
    }
  </ul>
)

export default UserList;