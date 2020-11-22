import React, { useEffect } from "react";
import { ClientContextProvider } from 'react-fetching-library';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';
import client from './api/client';
import Users from './users';

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
              <Nav.Link href="/users">Users</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <Container fluid>
        <Switch>
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
