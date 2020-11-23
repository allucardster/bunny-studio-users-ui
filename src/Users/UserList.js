import React, { useState, useEffect } from "react";
import {
  Switch,
  Route,
  Link,
  useRouteMatch
} from 'react-router-dom';
import { useQuery } from 'react-fetching-library';
import { userListAction } from '../api/actions/user';
import { Spinner, Table, Button } from 'react-bootstrap';
import CreateUser from './CreateUser';
import UpdateUser from './UpdateUser';
import DeleteUser from "./DeleteUser";

function UserList() {
  let { path, url } = useRouteMatch();
  const [state, setState] = useState({
    page: 1,
    per_page: 25,
    results: [],
    total: 0
  });

  const { loading, error, payload } = useQuery(
    userListAction()
  );

  useEffect(() => {
    if (payload) {
      setState({...payload});
    }
  }, [payload]);

  if (loading) {
    return (
      <Spinner animation="border" />
    );
  }

  if (error) {
    console.log('Unable to load users');
  }

  const addUser = (user) => {
    const { results } = state;

    results.push(user);

    setState({...state, results});
  }

  const editUser = (user) => {
    const { results } = state;
    const idx = results.findIndex(current => current.id === user.id);

    if (idx < 0) {
      return;
    }

    results[idx] = {...results[idx], ...user};

    setState({...state, results});
  }

  const removeUser = (id) => {
    const results = state.results.filter(current => current.id !== id);

    setState({...state, results});
  }

  return (
    <React.Fragment>
      <div className="d-flex justify-content-between bd-highlight mb-12">
        <div className="p-2 bd-highlight">
          <h1>Users</h1>
        </div>
        <div className="align-self-center p-2 bd-highlight">
          <Link className="btn btn-secondary" to={`${url}/add`}>Create User</Link>
        </div>
      </div>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th style={{width: '60%'}}>Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {state.results.map(user => {
            return (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>
                  <Button variant="secondary">User tasks</Button>{' '}
                  <Link className="btn btn-warning" to={`${url}/${user.id}/update`}>Update</Link>{' '}
                  <Link className="btn btn-danger" to={`${url}/${user.id}/delete`}>Delete</Link>{' '}
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      <Switch>
        <Route path={`${path}/add`}>
          <CreateUser callback={addUser}/>
        </Route>
        <Route path={`${path}/:userId/update`}>
          <UpdateUser callback={editUser}></UpdateUser>
        </Route>
        <Route path={`${path}/:userId/delete`}>
          <DeleteUser callback={removeUser}></DeleteUser>
        </Route>
      </Switch>
    </React.Fragment>
  );
}

export default UserList;