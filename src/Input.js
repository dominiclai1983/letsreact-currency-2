import React from 'react';
import { Link } from "react-router-dom";
import { json, checkStatus } from './utils';


import './Input.css';

class CurrencyConverter extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        startValue: 1.00,
        rate: 0.89,
        base: "USD",
        target: '',
        usd: 1,
        euro: 1 * 0.89,
      };
  
      this.handleUsdChange = this.handleUsdChange.bind(this);
      this.handleEuroChange = this.handleEuroChange.bind(this);
    }
  
    toUsd(amount, rate) {
      return amount * (1 / rate);
    }
  
    toEuro(amount, rate) {
      return amount * rate;
    }
  
    convert(amount, rate, equation) {
      const input = parseFloat(amount);
      if (Number.isNaN(input)) {
        return '';
      }
      return equation(input, rate).toFixed(3);
    }
  
    handleUsdChange(event) {
      const euro = this.convert(event.target.value, this.state.rate, this.toEuro);
      this.setState({
        usd: event.target.value,
        euro
      });
    }
  
    handleEuroChange(event) {
      const usd = this.convert(event.target.value, this.state.rate, this.toUsd);
      this.setState({
        euro: event.target.value,
        usd
      });
    }
  
    render() {
      const { rate, usd, euro, startValue } = this.state;
  
      return (
        <div className="container">
          <div className="text-center p-3 mb-2">
            <h2 className="mb-2">Currency Converter</h2>
            <h4>USD 1 : {rate} EURO</h4>
          </div>
          <div className="row text-center">
            <div className="col-12">
              <span className="mr-1">USD</span>
              <input value={usd} onChange={this.handleUsdChange} type="number" />
              <span className="mx-3">=</span>
              <input value={euro} onChange={this.handleEuroChange} type="number" />
              <span className="ml-1">EURO</span>
            </div>
          </div>

          {/* the currency exchange app row */}
          <div className="row">
            <div className="col-5">
              <span className="mr-1">Amount</span>
              <input value={startValue} className="form-control input-currency" type="number" />
            </div>


              <div className="col-3">
                <span className="mr-1">Base Currency</span>
                <div className="base-dropdown">
                    <button className="btn bg-transparent border-success dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Dropdown button
                    </button>
                    <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                        <a className="dropdown-item" href="#">Action</a>
                        <a className="dropdown-item" href="#">Another action</a>
                        <a className="dropdown-item" href="#">Something else here</a>
                    </div>
                </div>
              </div>

              <div className="col-1">
                <span className="mr-1 d-block">&nbsp;</span>
                <button type="button" className="btn btn-outline-primary">&#x2194;</button>
              </div>

              <div className="col-3">
                <span className="mr-1">Target Currency</span>
                <div className="target-dropdown">
                    <button className="btn bg-transparent border-success dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Dropdown button
                    </button>
                    <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                        <a className="dropdown-item" href="#">Action</a>
                        <a className="dropdown-item" href="#">Another action</a>
                        <a className="dropdown-item" href="#">Something else here</a>
                    </div>
                </div>
              </div>

          </div>
          {/* The convert button column*/}
          <div className="row">
            <div className="col-12 mt-2">
              <div class="d-flex justify-content-lg-end align-items-start">
                <button type="button" className="btn btn-primary convert-btn">Convert</button>
              </div>
            </div>
          </div>
        </div>
      )
    }
  }
  
  export default CurrencyConverter;