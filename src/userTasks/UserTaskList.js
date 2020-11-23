import React, { useState, useEffect } from "react";
import { useQuery } from 'react-fetching-library';
import { userTaskListAction } from '../api/actions/userTask';
import { Spinner, Table } from 'react-bootstrap';
import {
  Switch,
  Route,
  Link,
  useRouteMatch
} from 'react-router-dom';

function UserTaskList(props) {
  const { path, url } = useRouteMatch();
  const { user } = props;
  const [state, setState] = useState({
    page: 1,
    per_page: 25,
    results: [],
    total: 0
  });

  const { loading, error, payload } = useQuery(
    userTaskListAction(user.id)
  );

  useEffect(() => {
    if (payload) {
      setState({...payload});
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
    console.log('Unable to load users tasks');
  }

  return (
    <React.Fragment>
      <div className="d-flex justify-content-between bd-highlight mb-12">
        <div className="p-2 bd-highlight">
          <h1>{user.name} - Tasks</h1>
        </div>
        <div className="align-self-center p-2 bd-highlight">
          <Link className="btn btn-secondary" to={`${url}/add`}>Create Task</Link>
        </div>
      </div>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th style={{width: '40%'}}>Name</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {state.results.map(userTask => {
            return (
              <tr key={userTask.id}>
                <td>{userTask.description}</td>
                <td>{userTask.state}</td>
                <td>
                  <Link className="btn btn-warning" to={`${url}/users/${userTask.user.id}/user-tasks/${userTask.id}/update`}>Update</Link>{' '}
                  <Link className="btn btn-danger" to={`${url}/users/${userTask.user.id}/user-tasks/${userTask.id}/delete`}>Delete</Link>{' '}
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </React.Fragment>
  );
}

export default UserTaskList;