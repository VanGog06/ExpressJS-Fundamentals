import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import toastr from 'toastr';

import carActions from '../../actions/CarActions';
import CarStore from '../../stores/CarStore';

class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cars: []
    };

    this.handleSubmittedCars = this.handleSubmittedCars.bind(this);
    this.handleCarDeletion = this.handleCarDeletion.bind(this);

    CarStore.on(
      CarStore.eventTypes.FETCHED_PROFILE,
      this.handleSubmittedCars
    );

    CarStore.on(
      CarStore.eventTypes.CAR_DELETED,
      this.handleCarDeletion
    );
  }

  componentWillMount() {
    carActions.profile();
  }

  componentWillUnmount() {
    CarStore.removeListener(
      CarStore.eventTypes.FETCHED_PROFILE,
      this.handleSubmittedCars
    );

    CarStore.removeListener(
      CarStore.eventTypes.CAR_DELETED,
      this.handleCarDeletion
    );
  }

  handleSubmittedCars(data) {
    this.setState({
      cars: data
    });
  }

  deleteCar(event) {
    event.preventDefault();

    let id = this.id;
    carActions.deleteCar(id);

  }

  handleCarDeletion(data) {
    if (!data.success) {
      toastr.error(data.message);
    } else {
      toastr.success(data.message);
      carActions.profile();
    }
  }

  render() {
    let cars = 'There are currently no cars submitted by you!';

    if (this.state.cars.length > 0) {
      cars = this.state.cars.map(car => (
        <div key={car.id} className='container'>
          <Link to={`/cars/details/${car.id}`}>{car.id}. {car.make} {car.model}</Link>
          <Link to='' id={`${car.id}`} className='car-delete-btn' onClick={this.deleteCar}>[Delete]</Link>
        </div>
      ));
    }

    return (
      <div className='parent-div'>
        <h1>Own Cars</h1>
        {cars}
      </div>
    );
  }
}

export default Profile;