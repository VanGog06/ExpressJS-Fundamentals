import Data from './Data';

const baseUrl = 'cars';

class CarData {
  static create(car) {
    return Data.post(`${baseUrl}/create`, car, true);
  }

  static allCars(page) {
    page = page || 1;

    return Data.get(`${baseUrl}/all?page=${page}`);
  }

  static carById(id) {
    return Data.get(`${baseUrl}/details/${id}`, true);
  }

  static createReview(review, id) {
    return Data.post(`${baseUrl}/details/${id}/reviews/create`, review, true);
  }

  static allReviews(id) {
    return Data.get(`${baseUrl}/details/${id}/reviews`, true);
  }

  static profile() {
    return Data.get(`${baseUrl}/mine`, true);
  }

  static deleteCar(id) {
    return Data.post(`cars/delete/${id}`, {}, true);
  }

  static getStats() {
    return Data.get('stats');
  }

  static search(parameter, page) {
    page = page || 1;

    return Data.get(`${baseUrl}/all?page=${page}&search=${parameter}`);
  }

  static like(id) {
    return Data.post(`${baseUrl}/details/${id}/like`, {}, true);
  }
}

export default CarData;