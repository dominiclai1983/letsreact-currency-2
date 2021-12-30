import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Input from './Input';
import Footer from './Footer';

import './App.css';

const App = () => {
  return (
  <Router>
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <FontAwesomeIcon icon="vector-square" size="2x" className="no-gutters ml-lg-5 top-icon"/><a className="navbar-brand my-auto" href="#"> Dominic Lai Currency Converter</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#topnavbar" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

      <div className="collapse navbar-collapse" id="topnavbar">
        <div className="navbar-nav ml-auto my-auto">
          <a className="nav-item nav-link mx-lg-4 my-1 my-lg-0 text-dark" href="#">Home</a>
          <a className="nav-item nav-link mx-lg-4 my-1 my-lg-0 text-dark" href="#">About</a>
          <a className="nav-item nav-link mx-lg-4 my-1 my-lg-0 text-dark" href="#">Protfolio</a>
          <a className="nav-item nav-link btn btn-secondary text-white my-1 my-lg-0 px-2 mr-lg-4" id="top-button" href="mailto:dominiclai1983@gmail.com" role="button">Contact Me</a>
        </div>
      </div>
    </nav>
    <Switch>
      <Route path="/" exact component={Input} />
    </Switch>
      <Footer />
  </Router>
  );
}

export default App;