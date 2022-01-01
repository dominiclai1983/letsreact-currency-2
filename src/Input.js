import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { json, checkStatus } from './utils';

import './Input.css';

const ScaledRate = (props) => {
  const { scaledRate } = props;
  return (<p className="text-center inline-block exchange">
  {Object.values(scaledRate)[0]} {Object.keys(scaledRate)[0]} = {Object.values(scaledRate)[1]} {Object.keys(scaledRate)[1]} 
  </p>)
}

const DifferentRate = (props) => {
  const { differentRate } = props;
  return (<p className="text-center inline-block exchange">
  {differentRate[0]} = {differentRate[1]} 
  </p>)
}

const ShowError = () => {
  return (<p className="text-warning">Please choose two different value of currency!</p>)
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
        targatExchange: [],
        support: ["USD", "GBP", "EUR", "CNY", "HKD", "THB", "JPY"],
        scale: [1, 5, 10, 25, 50, 100],
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
      let { base, target, rate, startValue, targatScale, scale, support, targatExchange} = this.state;

      fetch(`https://altexchangerateapi.herokuapp.com/latest?from=${base}`)
      .then(checkStatus)
      .then(json)
      .then(data => {
        console.log(data);
        const targetValue = startValue * data.rates[target];
        const obj2 = this.collectNeedCur(support, data.rates);
        targatExchange = Object.entries(obj2);

        if (data.rates) {
          this.setState({ 
            exchange: data.rates,
            rate: data.rates[target],
            targetValue: targetValue.toFixed(3),
            targatExchange
          });
        }
      })
      .catch(error => {
        console.log(error);
      })

      const obj = this.convertObject(scale, rate);
      let targatScales = Object.keys(obj).map(e => ({[this.state.base]: Number(e), [this.state.base]: obj[e]}));

      this.setState({
          targatScale: targatScales,
        });

      console.log(targatScale); 

    }

    //convert target currency from set scale of base currency to an object
    convertObject(scaleArray, rate){
      const obj = {};
      for (const key of scaleArray){
        obj[key] = (key * rate).toFixed(2);
      }

      return obj;
    }

    //convert key:value pair of object to array 
    convertObjToArr(array, targetArray, rates, equation){
      const obj = equation(array, rates);
      targetArray.length = 0;
      targetArray = Object.entries(obj);
      return targetArray;
    }

    //method collect needed currency for displaying information
    collectNeedCur(supportArray, dataArray){
      let obj2 = {};
      for(let key in dataArray){
        for(let value in supportArray){
          if(key === supportArray[value]){
            obj2[key] = dataArray[key];
          }
        }
      }
      return obj2;
    }

    //method handle convert the currency
    convert(amount, rate, equation) {
      const input = parseFloat(amount);
      if (Number.isNaN(input)) {
        return '';
      }
      return equation(input, rate).toFixed(3);
    }

    //method handle the currency change
    toTargetCurrency(amount, rate){
      return amount * rate;
    }

    //convert object to array of object for easy rendering
    convertObjToArrObj(obj, array, base, target){
      array.lenght = 0;
      array = Object.keys(obj).map(e => ({[base]: Number(e), [target]: obj[e]}));
      return array;
    }

    handleBaseChange(event) { 

      let { target, startValue, targatScale, scale, support, targatExchange} = this.state;
      const e = event.target.value;

      this.setState({
        base: e
      })

      fetch(`https://altexchangerateapi.herokuapp.com/latest?from=${e}`)
      .then(checkStatus)
      .then(json)
      .then(data => {
        const targetValue = startValue * data.rates[target];
        const obj = this.convertObject(scale, data.rates[target]);

        let targatScales = this.convertObjToArrObj(obj, targatScale, event.target.value, this.state.target);
        targatExchange = this.convertObjToArr(support, targatExchange, data.rates, this.collectNeedCur);

        if(isNaN(targetValue)){
          this.setState({
            targetValue : startValue.toFixed(2)
          })
        }else if (data.rates) {
          this.setState({ 
            exchange: data.rates,
            rate: data.rates[target],
            targetValue: targetValue.toFixed(3),
            targatScale: targatScales,
            targatExchange
          });
        }
      })
      .catch(error => {
        console.log(error);
      })
    }

    handleTargetChange(event) { 
      let {startValue, exchange, targatScale, scale, target, base, support, targatExchange} = this.state;
      const e = event.target.value;
      const targetValue = this.convert(startValue,exchange[e],this.toTargetCurrency);

      const obj = this.convertObject(scale, exchange[e]);
      let targatScales = this.convertObjToArrObj(obj, targatScale, base, event.target.value);
      targatExchange = this.convertObjToArr(support, targatExchange, exchange, this.collectNeedCur);

      this.setState({
        target: e,
        rate: exchange[e],
        targatScale: targatScales,
        targatExchange
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

    handleStartValueChange(event){
      const targetValue = this.convert(event.target.value, this.state.rate, this.toTargetCurrency);
      this.setState({
        startValue: event.target.value,
        targetValue
      });
    }

    handleClick(){
      let { base, target, rate, startValue, targatScale, scale, exchange, support, targatExchange} = this.state;

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
        let targatScales = this.convertObjToArrObj(obj, targatScale, this.state.base, this.state.target);
        targatExchange = this.convertObjToArr(support, targatExchange, exchange, this.collectNeedCur);

        if(base === target){
          this.setState({
            targetValue: startValue.toFixed(2),
            targatScale: [],
          })
        }else if (data.rates) {
          this.setState({ 
            exchange: data.rates,
            rate: data.rates[target],
            targatScale: targatScales, 
            targatExchange
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
      let {base, target, startValue, scale, rate, targatScale, targatExchange, support} = this.state;
      
      const temp = base;
      base = target;
      target = temp;

      this.setState({
        base,
        target,
      }, () => {
        console.log(this.state.base);
        console.log(this.state.target);
      });

      fetch(`https://altexchangerateapi.herokuapp.com/latest?from=${base}`)
      .then(checkStatus)
      .then(json)
      .then(data => {
        console.log(data);
        const targetValue = startValue * data.rates[target];

        const obj = this.convertObject(scale, data.rates[target]);
        let targatScales = this.convertObjToArrObj(obj, targatScale, this.state.base, this.state.target);
        targatExchange = this.convertObjToArr(support, targatExchange, data.rates, this.collectNeedCur);

        if(base === target){
          this.setState({
            targetValue : startValue.toFixed(2)
          })
        }else if (data.rates) {
          this.setState({ 
            exchange: data.rates,
            rate: data.rates[target],
            targetValue: targetValue.toFixed(3),
            targatScale: targatScales, 
            targatExchange
          });
        }
      })
      .catch(error => {
        console.log(error);
      })
    }
  
    render() {
      const { startValue, base, target, targetValue, clicked, targatScale, targatExchange } = this.state;
  
      return (
        <div className="container bg-white rounded">
          <div className="text-center p-3 mb-2">
            <h2 className="mb-2">💰 Currency Converter 💰</h2>
          </div>

          {/* the currency exchange app row */}
          <div className="row">
            <div className="col-12 col-sm-3 text-center text-sm-left">
              <span className="mr-1">Amount</span>
              <div className="text-center">
              <input value={startValue} onChange={this.handleStartValueChange} className="form-control input-currency" type="number" />
              </div>
            </div>


              <div className="col-12 col-sm-4 text-center text-sm-left">
                <div className="col-xs-4">
                  <label className="mr-1">
                  Base Currency
                    <select name="base" value={base} onChange={this.handleBaseChange} className="form-control">
                      <option value="USD">🇺🇸 USD - US Dollar</option>
                      <option value="GBP">🇬🇧 GBP - British Pound</option>
                      <option value="EUR">🇪🇺 EUR - Euro</option>
                      <option value="CNY">🇨🇳 CNY - Chinese Yuan</option>
                      <option value="HKD">🇭🇰 HKD - HK Dollar</option>
                      <option value="THB">🇹🇭 THB - Thai Baht</option>
                      <option value="JPY">🇯🇵 JPY - Japanese Yan</option>
                    </select>
                  </label>
                </div>
              </div>

              <div className="col-12 col-sm-1 text-center">
                <span className="mr-1 d-sm-block">&nbsp;</span>
                <button type="button" onClick={this.handleSwap} className="btn btn-outline-primary swap-btn">&#x2194;</button>
              </div>

              <div className="col-12 col-sm-4 text-center text-sm-left">
                <div className="col-xs-4">
                  <label className="mr-1">
                  Target Currency
                    <select name="target" value={target} onChange={this.handleTargetChange} className="form-control">
                      <option value="GBP">🇬🇧 GBP - British Pound</option>
                      <option value="USD">🇺🇸 USD - US Dollar</option>
                      <option value="EUR">🇪🇺 EUR - Euro</option>
                      <option value="CNY">🇨🇳 CNY - Chinese Yuan</option>
                      <option value="HKD">🇭🇰 HKD - HK Dollar</option>
                      <option value="THB">🇹🇭 THB - Thai Baht</option>
                      <option value="JPY">🇯🇵 JPY - Japanese Yan</option>
                    </select>
                  </label>
                </div>
              </div>

          </div>
          {/* The convert button column*/}
          <div className="row">
            <div className="col-12 mt-2">
              <div className={clicked? "d-none" : null}>
                <div class="d-flex justify-content-center justify-content-sm-start justify-content-lg-end align-items-start">
                  <button type="button" onClick={this.handleClick} className="btn btn-primary">Convert</button>
                </div>
              </div>
            </div>
            <div className="col-12 mt-2">
              <div className={clicked? null: "d-none"}>
                <p className="result bg-light border border-2 border-success rounded">{startValue} {base} is equals to {targetValue} of {target}</p>
              </div>
            </div>
          </div>
          {/* The area showing the additional information*/}
          <div className="row">
            <div className="col-12 col-sm-6 mt-1 mb-3 text-center">
              <div className={clicked? "border border-secondary rounded": "d-none"}>
                <h4 className="text-muted mt-3">Exchange {base} To {target}</h4>
                {(() => {
                  if(base === target){
                    return <ShowError />;
                  }
                  return targatScale.map((scaledRate, index) => {
                    return <ScaledRate key={index} scaledRate={scaledRate} />;
                  })
                })()}
              </div>
            </div> 
            <div className="col-12 col-sm-6 mt-1 bottom-result text-center">
              <div className={clicked? "border border-secondary rounded": "d-none"}>
                <h4 className="text-info mt-3">{base} To Other Rate</h4>
                {(() => {
                  if(base === target){
                    return <ShowError />;
                  }
                  return targatExchange.map((differentRate, index) => {
                    return <DifferentRate key={index} differentRate={differentRate} />;
                  })
                })()}
              </div>
            </div>
          </div>
        </div>
      )
    }
  }
  
  export default CurrencyConverter;