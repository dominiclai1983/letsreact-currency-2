import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { json, checkStatus } from './utils';

import './Input.css';

const Result = () => {
  return (
    <div className="row">
    <div className="col-12 mt-2">
      <h4>{this.state.startValue}</h4>
    </div>
  </div>
  )
}

class CurrencyConverter extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        startValue: 1.00,
        targetValue: null,
        rate: 0.89,
        base: "USD",
        target: "GBP",
        exchange: [],
      };
  
      this.handleStartValueChange = this.handleStartValueChange.bind(this);
      this.handleBaseChange = this.handleBaseChange.bind(this);
      this.handleTargetChange = this.handleTargetChange.bind(this);
      this.handleClick = this.handleClick.bind(this);
    }



    handleBaseChange(event) { 
      this.setState({
        base: event.target.value
      })
      console.log(this.state.base);
    }

    handleTargetChange(event) { 
      this.setState({
        target: event.target.value
      })
      console.log(this.state.target);
    }

    convert(amount, rate, equation) {
      const input = parseFloat(amount);
      if (Number.isNaN(input)) {
        return '';
      }
      return equation(input, rate).toFixed(3);
    }


    toTargetCurrency(amount, rate){
      return amount * rate;
    }

    handleStartValueChange(event){
      const targetValue = this.convert(event.target.value, this.state.rate, this.toTargetCurrency);
      this.setState({
        startValue: event.target.value,
        targetValue
      });
    }

    
    handleClick(event){
      let { base, target, rate, startValue, targetValue, result} = this.state;

      if(base === target){
        return;
      }

      fetch(`https://altexchangerateapi.herokuapp.com/latest?from=${base}`)
      .then(checkStatus)
      .then(json)
      .then(data => {
        console.log(data);
        const targetValue = startValue * data.rates[target];
        if (data.rates) {
          this.setState({ 
            exchange: data.rates,
            rate: data.rates[target],
            targetValue: targetValue.toFixed(2)
          });
        }
      })
      .catch(error => {
        console.log(error);
      })

    }

  
    render() {
      const { rate, startValue, base, target, targetValue } = this.state;
  
      return (
        <div className="container">
          <div className="text-center p-3 mb-2">
            <h2 className="mb-2">Currency Converter</h2>
          </div>

          {/* the currency exchange app row */}
          <div className="row">
            <div className="col-5">
              <span className="mr-1">Amount</span>
              <input value={startValue} onChange={this.handleStartValueChange} className="form-control input-currency" type="number" />
            </div>


              <div className="col-3">
                <div className="col-xs-4">
                  <label className="mr-1">
                  Base Currency
                  <select name="base" value={base} onChange={this.handleBaseChange} className="form-control">
                    <option value="USD">🇺🇸 United States Dollar (USD)</option>
                    <option value="GBP">🇬🇧 Great British Pound (GBP)</option>
                    <option value="EUR">🇪🇺 Euro (EUR)</option>
                    <option value="CNY">🇨🇳 Chinese Yuan (CNY)</option>
                    <option value="HKD">🇭🇰 Hong Kong Dollar (HKD)</option>
                    <option value="THB">🇹🇭 Thai Baht (THB)</option>
                    <option value="JPY">🇯🇵 Japanese Yen (JPY)</option>
                    </select>
                  </label>
                </div>
              </div>

              <div className="col-1">
                <span className="mr-1 d-block">&nbsp;</span>
                <button type="button" className="btn btn-outline-primary">&#x2194;</button>
              </div>

              <div className="col-3">
                <div className="col-xs-4">
                  <label className="mr-1">
                  Target Currency
                  <select name="target" value={target} onChange={this.handleTargetChange} className="form-control">
                    <option value="GBP">🇬🇧 Great British Pound (GBP)</option>
                    <option value="USD">🇺🇸 United States Dollar (USD)</option> 
                    <option value="EUR">🇪🇺 Euro (EUR)</option>
                    <option value="CNY">🇨🇳 Chinese Yuan (CNY)</option>
                    <option value="HKD">🇭🇰 Hong Kong Dollar (HKD)</option>
                    <option value="THB">🇹🇭 Thai Baht (THB)</option>
                    <option value="JPY">🇯🇵 Japanese Yen (JPY)</option>
                    </select>
                  </label>
                </div>
              </div>

          </div>
          {/* The convert button column*/}
          <Router>
            <div className="row">
              <div className="col-12 mt-2">
                <div class="d-flex justify-content-lg-end align-items-start">
                  <Link to="/result/">
                    <button type="button" onClick={this.handleClick} className="btn btn-primary convert-btn">Convert</button>
                  </Link>
                </div>
              </div>
            </div>
            <Route path="/result" component={Result} />
            <Switch>
              <Route path="/result" component={Result} />
            </Switch>
          </Router>  

        </div>
      )
    }
  }
  
  export default CurrencyConverter;