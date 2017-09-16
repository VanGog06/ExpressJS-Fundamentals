import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import toastr from 'toastr';

import carActions from '../../actions/CarActions';
import CarStore from '../../stores/CarStore';
import CarReviewForm from './CarReviewForm'
import Review from './Review';
import FormHelpers from '../common/form/FormHelpers';
import Auth from '../users/Auth';

class CarById extends Component {
  constructor(props) {
    super(props);

    let id = this.props.match.params.id;

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
      id: id,
      review: {
        rating: '',
        comment: '',
        user: ''
      },
      reviews: [],
      error: ''
    };

    this.handleReceivedCar = this.handleReceivedCar.bind(this);
    this.handleReviewCreation = this.handleReviewCreation.bind(this);
    this.handleReceivedReviews = this.handleReceivedReviews.bind(this);
    this.handleLiked = this.handleLiked.bind(this);

    CarStore.on(
      CarStore.eventTypes.CAR_BY_ID_FETCHED,
      this.handleReceivedCar
    );

    CarStore.on(
      CarStore.eventTypes.REVIEW_CREATED,
      this.handleReviewCreation
    );

    CarStore.on(
      CarStore.eventTypes.FETCHED_REVIEWS,
      this.handleReceivedReviews
    );

    CarStore.on(
      CarStore.eventTypes.LIKED,
      this.handleLiked
    );
  }

  componentWillMount() {
    let id = this.state.id;

    carActions.carById(id);
    carActions.getReviews(id);

    this.setState({
      review: {
        user: Auth.getUser().name,
        rating: 1
      }
    });
  }

  componentWillUnmount() {
    CarStore.removeListener(
      CarStore.eventTypes.CAR_BY_ID_FETCHED,
      this.handleReceivedCar
    );

    CarStore.removeListener(
      CarStore.eventTypes.REVIEW_CREATED,
      this.handleReviewCreation
    );

    CarStore.removeListener(
      CarStore.eventTypes.FETCHED_REVIEWS,
      this.handleReceivedReviews
    );

    CarStore.removeListener(
      CarStore.eventTypes.LIKED,
      this.handleLiked
    );
  }

  handleReceivedCar(data) {
    this.setState({
      car: data
    });
  }

  handleRatingChange(event) {
    FormHelpers.handleFormChange.bind(this)(event, 'review');
  }

  saveReview(event) {
    event.preventDefault();

    if (this.validateReview()) {
      let error = this.validateReview();
      this.setState({ error });
      return;
    }

    carActions.createReview(this.state.review, this.state.id);
  }

  validateReview() {
    let review = this.state.review;
    let error = '';

    if (Number(review.rating) < 1 || Number(review.rating) > 5) {
      error = 'Rating can be between 1 and 5!';
      return error;
    }

    return error;
  }

  handleReviewCreation(data) {
    if (!data.success) {
      let firstError = FormHelpers.getFirstError(data);
      this.setState({ error: firstError });
    } else {
      toastr.success(data.message);
      carActions.getReviews(this.state.id);
    }
  }

  handleReceivedReviews(data) {
    this.setState({
      reviews: data
    });
  }

  like() {
    carActions.like(this.state.id);
  }

  handleLiked(data) {
    if (!data.success) {
      toastr.error('You have already liked this car!');
    } else {
      toastr.success(data.message);
      carActions.carById(this.state.id);
      carActions.getReviews(this.state.id);
    }
  }

  render() {
    let car = this.state.car;
    let reviews = 'There are currently no reviews for this product!';

    if (this.state.reviews.length > 0) {
      reviews = this.state.reviews.map((review, index) => (
        <Review key={index} review={review} />
      ));
    }

    return (
      <div className='parent-div'>
        <h1>Car Details</h1>
        <h3><strong>{car.make} {car.model}</strong></h3>
        <img className='hotel-image' src={car.image} alt={`Hotel ${car.id}`} />
        <p><strong>Engine:</strong> {car.engine}</p>
        <p><strong>Year:</strong> {car.year}</p>
        <p><strong>Price:</strong> {car.price} lv.</p>
        <p><strong>Likes:</strong> {car.likes}</p>
        { car.mileage ? (
          <p><strong>Mileage:</strong> {car.mileage}</p>
        ) : '' }
        <Link to={`/cars/details/${car.id}/likes`} onClick={this.like.bind(this)}>Like</Link>

        <h1>Reviews:</h1>
        <div className="reviews">
          {reviews}
        </div>

        <CarReviewForm
          error={this.state.error}
          onChange={this.handleRatingChange.bind(this)}
          onSave={this.saveReview.bind(this)}
        />
      </div>
    );
  }
}

export default CarById;