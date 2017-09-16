import { EventEmitter } from 'events';
import dispatcher from '../dispatcher';
import carActions from '../actions/CarActions';
import CarData from '../data/CarData';

class CarStore extends EventEmitter {
  create(car) {
    CarData
      .create(car)
      .then(data => this.emit(this.eventTypes.CAR_CREATED, data));
  }

  allCars(page) {
    page = page || 1;

    CarData
      .allCars(page)
      .then(data => this.emit(this.eventTypes.CARS_FETCHED, data));
  }

  carById(id) {
    CarData
      .carById(id)
      .then(data => this.emit(this.eventTypes.CAR_BY_ID_FETCHED, data));
  }

  createReview(review, id) {
    CarData
      .createReview(review, id)
      .then(data => this.emit(this.eventTypes.REVIEW_CREATED, data));
  }

  allReviews(id) {
    CarData
      .allReviews(id)
      .then(data => this.emit(this.eventTypes.FETCHED_REVIEWS, data));
  }

  profile() {
    CarData
      .profile()
      .then(data => this.emit(this.eventTypes.FETCHED_PROFILE, data));
  }

  deleteCar(id) {
    CarData
      .deleteCar(id)
      .then(data => this.emit(this.eventTypes.CAR_DELETED, data));
  }

  getStats() {
    CarData
      .getStats()
      .then(data => this.emit(this.eventTypes.STATS_FETCHED, data));
  }

  search(parameter, page) {
    CarData
      .search(parameter, page)
      .then(data => this.emit(this.eventTypes.SEARCHED, data));
  }

  like(id) {
    CarData
      .like(id)
      .then(data => this.emit(this.eventTypes.LIKED, data));
  }

  handleAction(action) {
    switch(action.type) {
      case carActions.types.CREATE_CAR:
        this.create(action.car);
        break;
      case carActions.types.ALL_CARS:
        this.allCars(action.page);
        break;
      case carActions.types.CAR_BY_ID:
        this.carById(action.id);
        break;
      case carActions.types.CREATE_REVIEW:
        this.createReview(action.review, action.id);
        break;
      case carActions.types.ALL_REVIEWS:
        this.allReviews(action.id);
        break;
      case carActions.types.PROFILE:
        this.profile();
        break;
      case carActions.types.DELETE_CAR:
        this.deleteCar(action.id);
        break;
      case carActions.types.GET_STATS:
        this.getStats();
        break;
      case carActions.types.SEARCH:
        this.search(action.parameter, action.page);
        break;
      case carActions.types.LIKE:
        this.like(action.id);
        break;
      default:
        break;
    }
  }
}

let carStore = new CarStore();

carStore.eventTypes = {
  CAR_CREATED: 'car_created',
  CARS_FETCHED: 'cars_fetched',
  CAR_BY_ID_FETCHED: 'car_by_id_fetched',
  REVIEW_CREATED: 'review_created',
  FETCHED_REVIEWS: 'fetched_reviews',
  FETCHED_PROFILE: 'fetched_profile',
  CAR_DELETED: 'car_deleted',
  STATS_FETCHED: 'stats_fetched',
  SEARCHED: 'searched',
  LIKED: 'liked'
};

dispatcher.register(carStore.handleAction.bind(carStore));

export default carStore;
