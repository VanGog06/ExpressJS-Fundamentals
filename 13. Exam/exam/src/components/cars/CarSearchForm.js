import React from 'react';
import {FormGroup, ControlLabel, FormControl, Button } from 'react-bootstrap';

const CarSearchForm = (props) => (
  <form>
    <FormGroup controlId='formBasicText'>
      <ControlLabel>Search For...</ControlLabel>
      <FormControl
        type='text'
        name='query'
        placeholder='Enter Search Query'
        onChange={props.onChange}
      />
      <FormControl.Feedback />
    </FormGroup>

    <FormGroup>
      <Button type='submit' onClick={props.onClick}>
        Search
      </Button>
    </FormGroup>
  </form>
);

export default CarSearchForm;