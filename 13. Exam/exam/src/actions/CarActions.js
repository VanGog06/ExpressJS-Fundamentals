import dispatcher from '../dispatcher';

const CarActions  = {
  types: {
    CREATE_CAR: 'CREATE_CAR',
    ALL_CARS: 'ALL_CARS',
    CAR_BY_ID: 'CAR_BY_ID',
    CREATE_REVIEW: 'CREATE_REVIEW',
    ALL_REVIEWS: 'ALL_REVIEWS',
    PROFILE: 'PROFILE',
    DELETE_CAR: 'DELETE_CAR',
    GET_STATS: 'GET_STATS',
    SEARCH: 'SEARCH',
    LIKE: 'LIKE'
  },
  create(car) {
    dispatcher.dispatch({
      type: this.types.CREATE_CAR,
      car
    });
  },
  allCars(page) {
    page = page || 1;
    dispatcher.dispatch({
      type: this.types.ALL_CARS,
      page
    });
  },
  carById(id) {
    dispatcher.dispatch({
      type: this.types.CAR_BY_ID,
      id
    });
  },
  createReview(review, id) {
    dispatcher.dispatch({
      type: this.types.CREATE_REVIEW,
      review,
      id
    });
  },
  getReviews(id) {
    dispatcher.dispatch({
      type: this.types.ALL_REVIEWS,
      id
    });
  },
  profile() {
    dispatcher.dispatch({
      type: this.types.PROFILE
    });
  },
  deleteCar(id) {
    dispatcher.dispatch({
      type: this.types.DELETE_CAR,
      id
    });
  },
  getStats() {
    dispatcher.dispatch({
      type: this.types.GET_STATS
    });
  },
  search(parameter, page) {
    dispatcher.dispatch({
      type: this.types.SEARCH,
      parameter,
      page
    });
  },
  like(id) {
    dispatcher.dispatch({
      type: this.types.LIKE,
      id
    });
  }
};

export default CarActions;