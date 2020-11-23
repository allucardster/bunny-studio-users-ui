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
import CreateUserTask from './CreateUserTask';
import UpdateUserTask from './UpdateUserTask';
import DeleteUserTask from './DeleteUserTask';

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

  const addUserTask = (userTask) => {
    const { results } = state;

    results.push(userTask);

    setState({...state, results});
  }

  const editUserTask = (userTask) => {
    const { results } = state;
    const idx = results.findIndex(current => current.id === userTask.id);

    if (idx < 0) {
      return;
    }

    results[idx] = {...results[idx], ...userTask};

    setState({...state, results});
  }

  const removeUserTask = (id) => {
    const results = state.results.filter(current => current.id !== id);

    setState({...state, results});
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
                  <Link className="btn btn-warning" to={`${url}/${userTask.id}/update`}>Update</Link>{' '}
                  <Link className="btn btn-danger" to={`${url}/${userTask.id}/delete`}>Delete</Link>{' '}
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      <Switch>
        <Route path={`${path}/add`}>
          <CreateUserTask callback={addUserTask}/>
        </Route>
        <Route path={`${path}/:userTaskId/update`}>
          <UpdateUserTask callback={editUserTask}/>
        </Route>
        <Route path={`${path}/:userTaskId/delete`}>
          <DeleteUserTask callback={removeUserTask}/>
        </Route>
      </Switch>
    </React.Fragment>
  );
}

export default UserTaskList;