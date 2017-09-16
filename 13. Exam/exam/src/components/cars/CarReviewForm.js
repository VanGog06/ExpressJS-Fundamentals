import React from 'react';
import { Button, FormGroup, ControlLabel, FormControl } from 'react-bootstrap';

const CarReviewForm = (props) => (
  <div className='container review-form'>
    <h1>Add a Review:</h1>
    <form>
      <FormGroup controlId='formControlsRating'>
        <ControlLabel>Rate: </ControlLabel>
        <FormControl componentClass='select' placeholder='Rating' onChange={props.onChange} name='rating'>
          <option value='1'>1</option>
          <option value='2'>2</option>
          <option value='3'>3</option>
          <option value='4'>4</option>
          <option value='5'>5</option>
        </FormControl>
      </FormGroup>

      <FormGroup controlId='formControlsComment'>
        <ControlLabel>Comment: </ControlLabel>
        <FormControl componentClass='textarea' placeholder='Comment' onChange={props.onChange} name='comment'/>
      </FormGroup>

      <p className="error-message">{props.error}</p>

      <Button type='submit' onClick={props.onSave}>
        Submit
      </Button>
    </form>
  </div>
);

export default CarReviewForm;