import React from 'react';
import { Route } from 'react-router-dom';
import UserList from './UserList';

export default function Users() {
  return (
    <React.Fragment>
      <Route>
        <UserList />
      </Route>
    </React.Fragment>
  );
};