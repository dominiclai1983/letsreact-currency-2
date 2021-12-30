import React from 'react';
import { json, checkStatus } from './utils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './Footer.css';

const Footer = () => {
    return(
        <footer>
        <div className="container-fluid">
          <div className="row bg-secondary py-3 ">
            <div className="col-6 d-flex pl-5">
              <a href="#first-sec">
                <div className="d-flex justify-content-center text-white">©Dominic Lai
                </div>
              </a>
            </div>
            <div className="col-6 justify-content-end d-flex pr-5">
              <div className="d-flex justify-content-center">
                <a className="news-icon" href="https://www.twitter.com" target="_blink"><FontAwesomeIcon icon="twitter" size="lg"/></a>
                <a className="news-icon" href="https://www.instagram.com" target="_blink"><FontAwesomeIcon icon="instagram" size="lg"/></a>
                <a className="news-icon" href="https://www.linkedin.com/in/dominiclaihk/" target="_blink"><FontAwesomeIcon icon="linkedin" size="lg"/></a>
                <a className="news-icon" href="https://www.facebook.com" target="_blink"><FontAwesomeIcon icon="facebook" size="lg"/></a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    );
}

export default Footer;

