import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { json, checkStatus } from './utils';

import './Input.css';

const ScaledRate = (props) => {
  const { scaledRate } = props;
  return <div className="col-12 text-center">{Object.keys(scaledRate)[0]} {Object.values(scaledRate)[0]} = {Object.keys(scaledRate)[1]} {Object.values(scaledRate)[1]} </div>
}

class CurrencyConverter extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        startValue: 1.00,
        targetValue: null,
        rate: null,
        base: "USD",
        target: "GBP",
        exchange: [],
        support: ["USD", "GBP", "EUR", "CNY", "HKD", "THB", "JPY"],
        scale: [1, 5, 10, 25, 50, 100, 500],
        targatScale: [],
        clicked: false,
      };
  
      this.handleStartValueChange = this.handleStartValueChange.bind(this);
      this.handleBaseChange = this.handleBaseChange.bind(this);
      this.handleTargetChange = this.handleTargetChange.bind(this);
      this.handleClick = this.handleClick.bind(this);
      this.handleSwap = this.handleSwap.bind(this);
    }

    componentDidMount() {
      let { base, target, rate, startValue, targatScale, scale} = this.state;

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
            targetValue: targetValue.toFixed(3)
          });
        }
      })
      .catch(error => {
        console.log(error);
      })

      const obj = this.convertObject(scale, rate);

      let targatScales = targatScale.slice();
      targatScales.length = 0;
      targatScales = Object.keys(obj).map(e => ({[this.state.base]: Number(e), [this.state.target]: obj[e]}));

      this.setState({
          targatScale: targatScales
        });

      console.log(targatScale); 

    }

    convertObject(scaleArray, rate){
      const obj = {};
      for (const key of scaleArray){
        obj[key] = (key * rate).toFixed(2);
      }

      return obj;
    }

    convertObjToArrObj(targatArray, obj, base, target){
      targatArray.length = 0;
      const arrayObj = Object.keys(obj).map(e => ({base: Number(e), target: obj[e]}));
      return arrayObj;
    }

    handleBaseChange(event) { 

      let { target, startValue, targatScale, scale} = this.state;
      const e = event.target.value;

      this.setState({
        base: e
      })

      fetch(`https://altexchangerateapi.herokuapp.com/latest?from=${e}`)
      .then(checkStatus)
      .then(json)
      .then(data => {
        console.log(data);
        const targetValue = startValue * data.rates[target];
        console.log(data.base);
        
        const obj = this.convertObject(scale, data.rates[target]);
        const targatScales = this.convertObjToArrObj(targatScale, obj, e, target);

        if(isNaN(targetValue)){
          this.setState({
            targetValue : startValue.toFixed(2)
          })
        }else if (data.rates) {
          this.setState({ 
            exchange: data.rates,
            rate: data.rates[target],
            targetValue: targetValue.toFixed(3),
            targatScale: targatScales
          });
        }
      })
      .catch(error => {
        console.log(error);
      })
    }

    handleTargetChange(event) { 
      let {startValue, exchange, targatScale, scale} = this.state;
      const e = event.target.value;
      const targetValue = this.convert(startValue,exchange[e],this.toTargetCurrency);

      const obj = this.convertObject(scale, exchange[e]);

      let targatScales = targatScale.slice();
      targatScales.length = 0;
      targatScales = Object.keys(obj).map(e => ({[this.state.base]: Number(e), [event.target.value]: obj[e]}));
      console.log(targatScale); 

      this.setState({
        target: e,
        rate: exchange[e],
        targatScale: targatScales
      });
      if(isNaN(targetValue)){
        this.setState({
          targetValue: startValue.toFixed(2)
        });
      }else{
        this.setState({
          targetValue
        });  
      }

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

    
    handleClick(){
      let { base, target, rate, startValue, targatScale, scale} = this.state;

      this.setState({
        clicked: true,
      });

      fetch(`https://altexchangerateapi.herokuapp.com/latest?from=${base}`)
      .then(checkStatus)
      .then(json)
      .then(data => {
        console.log(data);
        const targetValue = startValue * data.rates[target];

        const obj = this.convertObject(scale, rate);

        let targatScales = targatScale.slice();
        targatScales.length = 0;
        targatScales = Object.keys(obj).map(e => ({[this.state.base]: Number(e), [this.state.target]: obj[e]}));

        if(base === target){
          this.setState({
            targetValue : startValue.toFixed(2)
          })
        }else if (data.rates) {
          this.setState({ 
            exchange: data.rates,
            rate: data.rates[target],
            targatScale: targatScales
          });
          if (targetValue >= 10){
            this.setState({
              targetValue: targetValue.toFixed(2)
            })
          }else{
            this.setState({
              targetValue: targetValue.toFixed(3)
            })
          }
        }
      })
      .catch(error => {
        console.log(error);
      })

    }

    handleSwap(){
      let {base, target, startValue} = this.state;
      
      const temp = base;
      base = target;
      target = temp;

      this.setState({
        base,
        target,
      });

      fetch(`https://altexchangerateapi.herokuapp.com/latest?from=${base}`)
      .then(checkStatus)
      .then(json)
      .then(data => {
        console.log(data);
        const targetValue = startValue * data.rates[target];
        if(base === target){
          this.setState({
            targetValue : startValue.toFixed(2)
          })
        }else if (data.rates) {
          this.setState({ 
            exchange: data.rates,
            rate: data.rates[target],
            targetValue: targetValue.toFixed(3),
          });
        }
      })
      .catch(error => {
        console.log(error);
      })
    }

  
    render() {
      const { startValue, base, target, targetValue, clicked, targatScale } = this.state;
  
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
                <button type="button" onClick={this.handleSwap} className="btn btn-outline-primary">&#x2194;</button>
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
          <div className="row">
            <div className="col-12 mt-2">
              <div className={clicked? "d-none" : null}>
                <div class="d-flex justify-content-lg-end align-items-start">
                  <button type="button" onClick={this.handleClick} className="btn btn-primary">Convert</button>
                </div>
              </div>
            </div>
            <div className="col-12 mt-2">
              <div className={clicked? null: "d-none"}>
                <p className="result border border-2 border-success rounded">{startValue} {base} is equals to {targetValue} of {target}</p>
              </div>
            </div>
          </div>
          {/* The area showing the additional information*/}
          <div className="row">
            {(() => {
              if(!clicked){
                return;
              }
              return targatScale.map((scaledRate, index) => {
                return <ScaledRate key={index} scaledRate={scaledRate} />;
              })
            })()}
          </div>
        </div>
      )
    }
  }
  
  export default CurrencyConverter;