import React, { Component } from 'react';
import queryString from 'querystring';
import { Link } from 'react-router-dom';
import { Pager } from 'react-bootstrap';

import carActions from '../../actions/CarActions';
import CarStore from '../../stores/CarStore';
import CarSearchForm from './CarSearchForm';
import FormHelpers from '../common/form/FormHelpers';

class HomePage extends Component {
  constructor(props) {
    super(props);

    let query = queryString.parse(this.props.location.search);
    const page = parseInt(query['?page'], 10) || 1;

    this.state = {
      cars: [],
      page: page,
      search: {
        query: query['search']
      },
      searchedCars: [],
      isSearched: false,
      stats: {
        cars: 0,
        users: 0
      }
    };

    this.handleAllCars = this.handleAllCars.bind(this);
    this.handleSearched = this.handleSearched.bind(this);
    this.handleReceivedStats = this.handleReceivedStats.bind(this);

    CarStore.on(
      CarStore.eventTypes.STATS_FETCHED,
      this.handleReceivedStats
    );

    CarStore.on(
      CarStore.eventTypes.CARS_FETCHED,
      this.handleAllCars
    );

    CarStore.on(
      CarStore.eventTypes.SEARCHED,
      this.handleSearched
    );
  }

  componentWillMount() {
    if (this.state.search.query) {
      carActions.search(this.state.search.query, this.state.page);
    } else {
      carActions.allCars(this.state.page);
    }
    carActions.getStats();
  }

  componentWillUnmount() {
    CarStore.removeListener(
      CarStore.eventTypes.CARS_FETCHED,
      this.handleAllCars
    );

    CarStore.removeListener(
      CarStore.eventTypes.SEARCHED,
      this.handleSearched
    );

    CarStore.removeListener(
      CarStore.eventTypes.STATS_FETCHED,
      this.handleReceivedStats
    );
  }

  handleAllCars(data) {
    this.setState({
      cars: data
    });
  }

  handleSearchChange(event) {
    FormHelpers.handleFormChange.bind(this)(event, 'search');
  }

  handleSearch(event) {
    event.preventDefault();
    this.setState({ isSearched: true });
    this.props.history.push(`/cars/all?page=${this.state.page}&search=${this.state.search.query}`);
    carActions.search(this.state.search.query, this.state.page);
  }

  handleSearched(data) {
    this.setState({
      searchedCars: data
    });

    if (this.state.search.query) {
      this.setState({
        isSearched: true
      });
    } else {
      this.setState({
        isSearched: false
      });
    }
  }

  handleReceivedStats(data) {
    this.setState({
      stats: data
    });
  }

  previousPage() {
    let page = this.state.page;
    page--;

    if (page < 1) {
      return;
    }

    this.setState({ page });

    this.props.history.push(`/cars/all?page=${page}&search=${this.state.search.query}`);

    if (this.state.search.query) {
      carActions.search(this.state.search.query, page);
    } else {
      carActions.allCars(page);
    }
  }

  nextPage() {
    if (this.state.cars.length < 10 && this.state.searchedCars.length < 10) {
      return;
    }

    let page = this.state.page;
    page++;

    this.setState({ page });

    this.props.history.push(`/cars/all?page=${page}&search=${this.state.search.query}`);

    if (this.state.search.query) {
      carActions.search(this.state.search.query, page);
    } else {
      carActions.allCars(page);
    }
  }

  render() {
    let cars = 'There are currently on cars!';
    let searchedCars = [];

    if (this.state.cars.length > 0) {
      cars = this.state.cars.map((car, index) => (
        <div key={car.id} className='container'>
          <Link to={`/cars/details/${car.id}`}>{car.id}. {car.make} {car.model}</Link>
        </div>
      ));
    }

    if (this.state.searchedCars.length > 0) {
      searchedCars = this.state.searchedCars.map((car, index) => (
        <div key={car.id} className='container'>
          <Link to={`/cars/details/${car.id}`}>{car.id}. {car.make} {car.model}</Link>
        </div>
      ));
    }

    return (
      <div>
        <CarSearchForm
          onChange={this.handleSearchChange.bind(this)}
          onClick={this.handleSearch.bind(this)}
        />

        <p>Users: {this.state.stats.users} Cars: {this.state.stats.cars}</p>

        { this.state.isSearched ? (
          <div>
            <h1>Found Cars</h1>
            {searchedCars}
          </div>
        ) : (
          <div>
            <h1>All Cars</h1>
            {cars}
          </div>
        )}
        <Pager>
          <Pager.Item onClick={this.previousPage.bind(this)}>Previous</Pager.Item>
          {' '}
          <Pager.Item onClick={this.nextPage.bind(this)}>Next</Pager.Item>
        </Pager>
      </div>
    );
  }
}

export default HomePage;