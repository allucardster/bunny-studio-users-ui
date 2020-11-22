import React, { useState, useEffect } from "react";
import { useQuery } from 'react-fetching-library';
import { userListAction } from '../api/actions/user';
import { Spinner, Table, Button } from 'react-bootstrap';

function UserList() {
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

  return (
    <React.Fragment>
      <div class="d-flex justify-content-between bd-highlight mb-12">
        <div class="p-2 bd-highlight">
          <h1>Users</h1>
        </div>
        <div class="align-self-center p-2 bd-highlight">
          <Button variant="secondary" className="align-middle">Add User</Button>
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
                  <Button variant="secondary">User tasks</Button>
                  <Button variant="warning">Edit</Button>
                  <Button variant="danger">Success</Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </React.Fragment>
  );
}

export default UserList;