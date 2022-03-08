import React, {useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Input from './Input';
import Footer from './Footer';

import './App.css';

const App = (props) => {


  //using useState to control the toogle button manual show or not after clicking
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);
  const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <FontAwesomeIcon icon="vector-square" size="2x" className="no-gutters ml-lg-5 top-icon"/><a className="navbar-brand my-auto" href="https://dominiclai1983-portfolio.netlify.app/"> Dominic Lai Currency Converter</a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#topnavbar" aria-controls="topnavbar" aria-expanded={!isNavCollapsed ? true : false} onClick={handleNavCollapse} aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

        <div className={`${isNavCollapsed ? 'collapse' : ''} navbar-collapse`} id="topnavbar">
          <div className="navbar-nav ml-auto my-auto">
            <a className="nav-item nav-link mx-lg-4 my-1 my-lg-0 text-dark" href="https://dominiclai1983-portfolio.netlify.app/">Home</a>
            <a className="nav-item nav-link mx-lg-4 my-1 my-lg-0 text-dark" href="https://dominiclai1983-portfolio.netlify.app/">About</a>
            <a className="nav-item nav-link mx-lg-4 my-1 my-lg-0 text-dark" href="https://dominiclai1983-portfolio.netlify.app/">Protfolio</a>
            <a className="nav-item nav-link btn btn-secondary text-white my-1 my-lg-0 px-2 mr-lg-4" id="top-button" href="mailto:dominiclai1983@gmail.com" role="button">Contact Me</a>
          </div>
        </div>
      </nav>
      <Input />    
      <Footer />
    </>
  );

}

export default App;