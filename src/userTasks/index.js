import React, { useState, useEffect } from 'react';
import { useQuery } from 'react-fetching-library';
import { readUserAction } from '../api/actions/user';
import { Spinner } from 'react-bootstrap';
import { Route } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import UserTaskList from './UserTaskList';

function UserTasks() {
  const { userId } = useParams();
  const [user, setUser] = useState({});

  const { loading, error, payload } = useQuery(
    readUserAction(userId)
  );

  useEffect(() => {
    if (payload) {
      setUser({...payload});
    }
  }, [payload]);

  if (loading) {
    return (
      <div className="text-center">
        <Spinner animation="border" />
      </div>
    );
  }

  if (error) {
    console.log('Unable to load user');
  }

  return (
    <React.Fragment>
      <Route>
        <UserTaskList user={user} />
      </Route>
    </React.Fragment>
  );
};

export default UserTasks;