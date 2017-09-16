import React, { Component } from 'react';
import toastr from 'toastr';

import LoginForm from './LoginForm';
import FormHelpers from '../common/form/FormHelpers';
import userActions from '../../actions/UserActions';
import UserStore from '../../stores/UserStore';
import Auth from './Auth';

class LoginPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {
        email: '',
        password: ''
      },
      error: ''
    };

    this.handleUserLoggedIn = this.handleUserLoggedIn.bind(this);

    UserStore.on(
      UserStore.eventTypes.USER_LOGGED_IN,
      this.handleUserLoggedIn
    );
  }

  componentWillUnmount() {
    UserStore.removeListener(
      UserStore.eventTypes.USER_LOGGED_IN,
      this.handleUserLoggedIn
    );
  }

  handleFormChange(event) {
    FormHelpers.handleFormChange.bind(this)(event, 'user');
  }

  handleUserLogin(event) {
    event.preventDefault();

    if (this.validateUser()) {
      let error = this.validateUser();
      this.setState({ error });

      return;
    }

    userActions.login(this.state.user);
  }

  validateUser() {
    const user = this.state.user;
    let error = '';

    if (user.email.length === 0) {
      error = 'Email address cannot be empty!';
      return error;
    }

    if (user.password.length === 0) {
      error = 'Password cannot be empty!';
      return error;
    }

    return error;
  }

  handleUserLoggedIn(data) {
    if (!data.success) {
      let firstError = FormHelpers.getFirstError(data);
      this.setState({ error: firstError });
    } else {
      Auth.saveUser(data.user);
      Auth.authenticateUser(data.token);
      toastr.success(data.message);
      this.props.history.push('/');
    }
  }

  render() {
    return (
      <div className='user-form'>
        <h1>Login</h1>
        <LoginForm
          error={this.state.error}
          user={this.state.user}
          onChange={this.handleFormChange.bind(this)}
          onClick={this.handleUserLogin.bind(this)}
        />
      </div>
    );
  }
}

export default LoginPage;