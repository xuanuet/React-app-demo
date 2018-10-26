import React, { Component } from 'react';


class App extends Component {
  state ={
    value: '0',
    displayValue: '0',
    waitingForOperand : false,
    operator : null
  };

  inputDigit (digit){
    const {displayValue, waitingForOperand} = this.state
    if(waitingForOperand){
    this.setState({
      displayValue: String(digit),
      waitingForOperand: false
})
    }
    else{
      this.setState({
      displayValue: displayValue === '0' ? String(digit) : displayValue + digit
    })
  }
  }

  inputDot (){
    const {displayValue, waitingForOperand} = this.state
    if(waitingForOperand)
    {
      this.setState({
        displayValue: '.',
        waitingForOperand: false
      })
    }
    else
    {
      if(displayValue.indexOf('.')== -1){
        this.setState({
          displayValue: displayValue + '.',
          waitingForOperand: false
        })
      }
    }
  }

  clearDisplay(){
       this.setState({ displayValue: '0'})
      }

    toggleSign(){
      const {displayValue} = this.state
      this.setState({
        displayValue: displayValue.charAt(0) === '-' ? displayValue.substr(1) : '-' + displayValue
      })
    }

    inputPercent(){
      const {displayValue} = this.state
      const value= parseFloat(displayValue)
      this.setState({
        displayValue: String(value/100)
      })
    }
  performOperation(nextOperator){
    const {displayValue, operator, value} = this.state
    const inputValue = parseFloat(displayValue)
    const operate = {
      '/': (prev, next) => prev / next,
      '*': (prev, next) => prev * next,
      '-': (prev, next) => prev - next,
      '+': (prev, next) => prev + next,
      '=': (prev, next) => next
    }
    if(value==null){
    this.setState({
      value: inputValue
    }
)}
    else if(operator){
        const currentValue = value || 0
        const computedValue = operate[operator](currentValue,inputValue)
        this.setState({
         value: computedValue,
         displayValue: String(computedValue)
        })
}
   
    this.setState({
      waitingForOperand : true,
      operator : nextOperator
    })

  }

  render() {
    const {displayValue}= this.state;
    return (
      <div className="calculator">
      <div className="calculator-display">
      <div className="auto-scaling-text">{displayValue}
      </div>
      </div>
      <div className="calculator-keypad">
        <div className="input-keys">
          <div className="function-keys">
            <button className="key-clear" onClick={() => this.clearDisplay() }>AC</button>
            <button className="key-sign" onClick={() => this.toggleSign()}>±</button>
            <button className="key-percent" onClick={() => this.inputPercent()}>%</button>
          </div>
          <div className="digit-keys">
            <button className="key-0" onClick={() => this.inputDigit(0)}>0</button>
            <button className="key-dot" onClick={() => this.inputDot()}>●</button>
            <button className="key-1" onClick={() => this.inputDigit(1)}>1</button>
            <button className="key-2" onClick={() => this.inputDigit(2)}>2</button>
            <button className="key-3" onClick={() => this.inputDigit(3)}>3</button>
            <button className="key-4" onClick={() => this.inputDigit(4)}>4</button>
            <button className="key-5" onClick={() => this.inputDigit(5)}>5</button>
            <button className="key-6" onClick={() => this.inputDigit(6)}>6</button>
            <button className="key-7" onClick={() => this.inputDigit(7)}>7</button>
            <button className="key-8" onClick={() => this.inputDigit(8)}>8</button>
            <button className="key-9" onClick={() => this.inputDigit(9)}>9</button>
          </div>
        </div>
        <div className="operator-keys">
          <button className="key-divide" onClick={() => this.performOperation('/')}>÷</button>
          <button className="key-multiply" onClick={() => this.performOperation('*')}>×</button>
          <button className="key-subtract" onClick={() => this.performOperation('-')}>−</button>
          <button className="key-add" onClick={() => this.performOperation('+')}>+</button>
          <button className="key-equals" onClick={() => this.performOperation('=')}>=</button>
        </div>
      </div>
    </div>
    );
  }
}

export default App;
