import React, { Component } from 'react';
import toastr from 'toastr';

import CreateCarForm from './CreateCarForm';
import FormHelpers from '../common/form/FormHelpers';
import carActions from '../../actions/CarActions';
import CarStore from '../../stores/CarStore';

class CreateCarPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      car: {
        make: '',
        model: '',
        year: '',
        engine: '',
        price: '',
        image: '',
        mileage: ''
      },
      error: ''
    };

    this.handleCarCreation = this.handleCarCreation.bind(this);

    CarStore.on(
      CarStore.eventTypes.CAR_CREATED,
      this.handleCarCreation
    );
  }

  componentWillUnmount() {
    CarStore.removeListener(
      CarStore.eventTypes.CAR_CREATED,
      this.handleCarCreation
    );
  }

  handleCarChange(event) {
    FormHelpers.handleFormChange.bind(this)(event, 'car');
  }

  handleCarForm(event) {
    event.preventDefault();

    if (this.validateCar()) {
      let error = this.validateCar();
      this.setState({ error });
      return;
    }

    carActions.create(this.state.car);
  }

  validateCar() {
    const car = this.state.car;
    let error = '';

    if (car.make.length === 0) {
      error = 'Car\'s make cannot be empty!';
      return error;
    }

    if (car.model.length === 0) {
      error = 'Car\'s model cannot be empty!';
      return error;
    }

    if (Number(car.year) < 1950) {
      error = 'Car\'s year cannot be less than 1950!';
      return error;
    }

    if (car.engine.length === 0) {
      error = 'Car\'s engine cannot be empty!';
      return error;
    }

    if (Number(car.price) < 0) {
      error = 'Car\'s price cannot be less than 0!';
      return error;
    }

    if (car.image.length === 0) {
      error = 'Car\'s image cannot be empty!';
      return error;
    }

    if (car.mileage) {
      if (Number(car.mileage) < 0) {
        error = 'Car\'s mileage cannot be less than 0!';
        return error;
      }
    }

    return error;
  }

  handleCarCreation(data) {
    if (!data.success) {
      let firstError = FormHelpers.getFirstError(data);
      this.setState({ error: firstError });
    } else {
      toastr.success('Car Added!');
      this.props.history.push('/');
    }
  }

  render() {
    return (
      <div className="container car-page-form">
        <h1>Create Car</h1>
        <CreateCarForm
          error={this.state.error}
          car={this.state.car}
          onChange={this.handleCarChange.bind(this)}
          onSave={this.handleCarForm.bind(this)}
        />
      </div>
    );
  }
}

export default CreateCarPage;