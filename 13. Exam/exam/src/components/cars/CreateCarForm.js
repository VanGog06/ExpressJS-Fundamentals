import React from 'react';
import { Form, FormGroup, Col, ControlLabel, FormControl, Button } from 'react-bootstrap';

const CreateCarForm = (props) => (
  <Form horizontal>
    <FormGroup controlId='formHorizontalMake'>
      <Col componentClass={ControlLabel} sm={2}>
        Make:
      </Col>
      <Col sm={10}>
        <FormControl
          type='text'
          placeholder='Make'
          name='make'
          value={props.car.make}
          onChange={props.onChange}
        />
      </Col>
    </FormGroup>

    <FormGroup controlId='formHorizontalModel'>
      <Col componentClass={ControlLabel} sm={2}>
        Model:
      </Col>
      <Col sm={10}>
        <FormControl
          type='text'
          placeholder='Model'
          name='model'
          value={props.car.model}
          onChange={props.onChange}
        />
      </Col>
    </FormGroup>

    <FormGroup controlId='formHorizontalYear'>
      <Col componentClass={ControlLabel} sm={2}>
        Year:
      </Col>
      <Col sm={10}>
        <FormControl
          type='number'
          min='1'
          placeholder='Year'
          name='year'
          value={props.car.year}
          onChange={props.onChange}
        />
      </Col>
    </FormGroup>

    <FormGroup controlId='formHorizontalEngine'>
      <Col componentClass={ControlLabel} sm={2}>
        Engine:
      </Col>
      <Col sm={10}>
        <FormControl
          type='text'
          placeholder='Engine'
          name='engine'
          value={props.car.engine}
          onChange={props.onChange}
        />
      </Col>
    </FormGroup>

    <FormGroup controlId='formHorizontalPrice'>
      <Col componentClass={ControlLabel} sm={2}>
        Price:
      </Col>
      <Col sm={10}>
        <FormControl
          type='number'
          min='0'
          placeholder='Price'
          name='price'
          value={props.car.price}
          onChange={props.onChange}
        />
      </Col>
    </FormGroup>

    <FormGroup controlId='formHorizontalImage'>
      <Col componentClass={ControlLabel} sm={2}>
        Car Image:
      </Col>
      <Col sm={10}>
        <FormControl
          type='url'
          placeholder='Car Image'
          name='image'
          value={props.car.image}
          onChange={props.onChange}
        />
      </Col>
    </FormGroup>

    <FormGroup controlId='formHorizontalMileage'>
      <Col componentClass={ControlLabel} sm={2}>
        Mileage:
      </Col>
      <Col sm={10}>
        <FormControl
          type='number'
          min='0'
          placeholder='Mileage'
          name='mileage'
          value={props.car.mileage}
          onChange={props.onChange}
        />
      </Col>
    </FormGroup>

    <span className="error-message">{props.error}</span>

    <FormGroup>
      <Col smOffset={2} sm={10} className='create-car-btn'>
        <Button type='submit' onClick={props.onSave}>
          Create
        </Button>
      </Col>
    </FormGroup>
  </Form>
);

export default CreateCarForm;