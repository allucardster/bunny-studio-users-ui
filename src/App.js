import React, { useEffect } from "react";
import { ClientContextProvider } from 'react-fetching-library';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  Link
} from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';
import client from './api/client';
import Users from './users';
import UserTasks from "./userTasks";

function App() {
  useEffect(() => {
    document.title = "Bunny Studio";
  });

  return (
    <ClientContextProvider client={client}>
      <Router>
        <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
          <Navbar.Brand href="/">Bunny Studio</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Link to="/" className="nav-link">Users</Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <Container fluid>
        <Switch>
          <Route path="/users/:userId/user-tasks">
            <UserTasks />
          </Route>
          <Route path="/users">
            <Users />
          </Route>
          <Route path="/">
              <Redirect
                to={{
                  pathname: "/users"
                }}
              />
          </Route>
        </Switch>
        </Container>
      </Router>
    </ClientContextProvider>
  );
}

export default App;
