import { Component } from 'react';
import toastr from 'toastr';

import carActions from '../../actions/CarActions';
import CarStore from '../../stores/CarStore';

class DeleteCar extends Component {
  constructor(props) {
    super(props);

    let id = this.props.match.params.id;

    this.state = {
      id: id
    };

    this.handleCarDeletion = this.handleCarDeletion.bind(this);

    CarStore.on(
      CarStore.eventTypes.CAR_DELETED,
      this.handleCarDeletion
    );
  }

  componentWillMount() {
    carActions.deleteCar(this.state.id);
    this.props.history.push('/cars/mine');
  }

  componentWillUnmount() {
    CarStore.removeListener(
      CarStore.eventTypes.CAR_DELETED,
      this.handleCarDeletion
    );
  }

  handleCarDeletion(data) {
    if (!data.success) {
      toastr.error(data.message);
    } else {
      toastr.success(data.message);
      carActions.getReviews(this.state.id);
    }
  }

  render() {
    return null;
  }
}

export default DeleteCar;