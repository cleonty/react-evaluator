import React from 'react';
import Counter from '../counter/Counter';
import evaluate from '../expression/Expression';
import './Evaluator.css';

class Evaluator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      counters: []
    };
    this.operators = '+-*/';
  }
  onCounterIncrement(i) {
    this.setState(prevState => ({
      counters: prevState.counters.map(
        (counter, index) => (i === index ? counter + 1 : counter)
      )
    }));
  }

  onCounterDecrement(i) {
    this.setState(prevState => ({
      counters: prevState.counters.map(
        (counter, index) => (i === index ? counter - 1 : counter)
      )
    }));
  }

  addCounter() {
    this.setState(prevState => ({
      counters: [...prevState.counters, 0]
    }));
  }

  removeCounter() {
    this.setState(prevState => ({
      counters: prevState.counters.slice(0, -1)
    }));
  }

  getOperatorByIndex(i) {
    return i > 0 ? this.operators[(i - 1) % this.operators.length] : '';
  }

  render() {
    const result = evaluate(this.state.counters, this.operators);
    const counters = this.state.counters.map((_, i) => (
      <div key={i.toString()} className="counter-container">
        <div className="op">
          {this.getOperatorByIndex()}
        </div>
        <Counter
          key={i.toString()}
          onIncrement={() => this.onCounterIncrement(i)}
          onDecrement={() => this.onCounterDecrement(i)}
        />
      </div>
    ));
    return (
      <div className="evaluator">
        <Counter
          onIncrement={() => this.addCounter()}
          onDecrement={() => this.removeCounter()}
        />
        <div className="symbol">:</div>
        <div className="counters">{counters}</div>
        <div className="symbol">{this.state.counters.length > 0 ? '=' : ''}</div>
        <div className="result">
          <div>{result.res}</div>
          <div>{result.err}</div>
        </div>
      </div>
    );
  }
}

export default Evaluator;
