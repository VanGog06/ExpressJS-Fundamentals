import React, { Component } from 'react';
import './App.css';

import NavBar from './components/common/NavBar';
import Footer from './components/common/Footer';

import Routes from './components/common/routes/Routes';

class App extends Component {
  render() {
    return (
      <div className="App">
        <NavBar />
        <Routes />
        <Footer />
      </div>
    );
  }
}

export default App;
