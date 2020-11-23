import React from 'react';
import { Route } from 'react-router-dom';
import UserList from './UserList';

function Users() {
  return (
    <React.Fragment>
      <Route>
        <UserList />
      </Route>
    </React.Fragment>
  );
};

export default Users;