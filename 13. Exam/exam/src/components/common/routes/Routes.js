import React from 'react';
import { Switch, Route } from 'react-router-dom';

import PrivateRoute from './PrivateRoute';

import RegisterPage from '../../users/RegisterPage';
import LoginPage from '../../users/LoginPage';
import LogoutPage from '../../users/LogoutPage';
import HomePage from '../../cars/HomePage';
import CreateCarPage from '../../cars/CreateCarPage';
import CarById from '../../cars/CarById';
import Profile from '../../cars/Profile';
import DeleteCar from '../../cars/DeleteCar';
import PageNotFound from '../../common/PageNotFound';

const Routes = () => (
  <Switch>
    <Route exact path='/' component={HomePage} />
    <Route path='/cars/all' component={HomePage} />
    <Route path='/users/login' component={LoginPage} />
    <Route path='/users/register' component={RegisterPage} />
    <Route path='/users/logout' component={LogoutPage} />
    <PrivateRoute path='/cars/create' component={CreateCarPage} />
    <PrivateRoute path='/cars/mine' component={Profile} />
    <PrivateRoute path='/cars/delete/:id' component={DeleteCar} />
    <PrivateRoute path='/cars/details/:id' component={CarById} />
    <Route component={PageNotFound} />
  </Switch>
);

export default Routes;