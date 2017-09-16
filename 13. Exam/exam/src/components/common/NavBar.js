import React, {Component} from 'react';
import {Navbar, Nav, NavItem} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';
import {Link} from 'react-router-dom';
import Auth from '../users/Auth';
import UserStore from '../../stores/UserStore';

class NavBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: Auth.getUser().name
    };

    this.handleUserLoggedIn = this.handleUserLoggedIn.bind(this);

    UserStore.on(
      UserStore.eventTypes.USER_LOGGED_IN,
      this.handleUserLoggedIn
    );
  }

  handleUserLoggedIn(data) {
    if (data.success) {
      this.setState({name: data.user.name});
    }
  }

  render() {
    return (
      <Navbar inverse>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to='/'>Exam Prep 2017</Link>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
            <LinkContainer to='/'>
              <NavItem eventKey={1}>Home</NavItem>
            </LinkContainer>
            <LinkContainer to='/cars/create'>
              <NavItem eventKey={2}>Create Car</NavItem>
            </LinkContainer>
          </Nav>
          { Auth.isUserAuthenticated() ? (
            <Nav pullRight>
              <LinkContainer to='/cars/mine'>
                <NavItem>{this.state.name}</NavItem>
              </LinkContainer>
              <LinkContainer to='/users/logout'>
                <NavItem>Logout</NavItem>
              </LinkContainer>
            </Nav>
          ) : (
            <Nav pullRight>
              <LinkContainer to='/users/login'>
                <NavItem>Login</NavItem>
              </LinkContainer>
              <LinkContainer to='/users/register'>
                <NavItem>Register</NavItem>
              </LinkContainer>
            </Nav>
          ) }
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default NavBar;