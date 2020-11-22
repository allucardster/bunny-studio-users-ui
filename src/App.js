import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import { Navbar, Nav, Container } from 'react-bootstrap';
import Users from "./Users";

function App() {
  useEffect(() => {
    document.title = "Bunny Studio";
  });

  return (
    <React.Fragment>
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
    </React.Fragment>
  );
}

export default App;
