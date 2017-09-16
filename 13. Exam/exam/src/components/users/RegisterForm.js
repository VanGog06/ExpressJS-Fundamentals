import React from 'react';
import {Form, FormGroup, Col, ControlLabel, FormControl, Button} from 'react-bootstrap';

const RegisterForm = (props) => (
  <Form horizontal>
    <FormGroup controlId='formHorizontalEmail'>
      <Col componentClass={ControlLabel} sm={2}>
        Email
      </Col>
      <Col sm={10}>
        <FormControl
          type='email'
          placeholder='Email'
          name='email'
          value={props.user.email}
          onChange={props.onChange}
        />
      </Col>
    </FormGroup>

    <FormGroup controlId='formHorizontalPassword'>
      <Col componentClass={ControlLabel} sm={2}>
        Password
      </Col>
      <Col sm={10}>
        <FormControl
          type='password'
          placeholder='Password'
          name='password'
          value={props.user.password}
          onChange={props.onChange}
        />
      </Col>
    </FormGroup>

    <FormGroup controlId='formHorizontalPassword'>
      <Col componentClass={ControlLabel} sm={2}>
        Confirm Password
      </Col>
      <Col sm={10}>
        <FormControl
          type='password'
          placeholder='Confirm Password'
          name='confirmPassword'
          value={props.user.confirmPassword}
          onChange={props.onChange}
        />
      </Col>
    </FormGroup>

    <FormGroup controlId='formHorizontalPassword'>
      <Col componentClass={ControlLabel} sm={2}>
        Name
      </Col>
      <Col sm={10}>
        <FormControl
          type='text'
          placeholder='Name'
          name='name'
          value={props.user.name}
          onChange={props.onChange}
        />
      </Col>
    </FormGroup>

    <span className="error-message">{props.error}</span>

    <FormGroup>
      <Col smOffset={2} sm={10} className='register'>
        <Button type='submit' onClick={props.onClick}>
          Register
        </Button>
      </Col>
    </FormGroup>
  </Form>
);

export default RegisterForm;