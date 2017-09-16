import React, { Component } from 'react';
import toastr from 'toastr';

import RegisterForm from './RegisterForm';
import FormHelpers from '../common/form/FormHelpers';
import userActions from '../../actions/UserActions';
import UserStore from '../../stores/UserStore';

class RegisterPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {
        email: '',
        password: '',
        confirmPassword: '',
        name: ''
      },
      error: ''
    };

    this.handleUserRegistration = this.handleUserRegistration.bind(this);

    UserStore.on(
      UserStore.eventTypes.USER_REGISTERED,
      this.handleUserRegistration
    );
  }

  componentWillUnmount() {
    UserStore.removeListener(
      UserStore.eventTypes.USER_REGISTERED,
      this.handleUserRegistration
    );
  }

  handleUserChange(event) {
    FormHelpers.handleFormChange.bind(this)(event, 'user');
  }

  handleUserForm(event) {
    event.preventDefault();

    if (this.validateUser()) {
      let error = this.validateUser();
      this.setState({ error });

      return;
    }

    userActions.register(this.state.user);
  }

  validateUser() {
    const user = this.state.user;
    let error = '';

    if (user.email.length === 0) {
      error = 'Email cannot be empty!';
      return error;
    }

    if (user.password.length < 3) {
      error = 'Password must be at least 3 symbols!';
      return error;
    }

    if (user.password !== user.confirmPassword) {
      error = 'Passwords do not match!';
      return error;
    }

    if (user.name.length === 0) {
      error = 'Name cannot be empty!';
      return error;
    }

    return error;
  }

  handleUserRegistration(data) {
    if (!data.success) {
      let firstError = FormHelpers.getFirstError(data);
      this.setState({ error: firstError });
    } else {
      toastr.success('User registered successfully!');
      this.props.history.push('/users/login');
    }
  }

  render() {
    return (
      <div className='user-form'>
        <h1>Register</h1>
        <RegisterForm
          error = {this.state.error}
          user={this.state.user}
          onChange={this.handleUserChange.bind(this)}
          onClick={this.handleUserForm.bind(this)}
        />
      </div>
    );
  }
}

export default RegisterPage;