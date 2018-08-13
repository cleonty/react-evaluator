import React from 'react';
import './Counter.css';

class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0
    };
  }

  inc() {
    this.setState(prevState => ({
      count: prevState.count + 1
    }));
    this.props.onIncrement();
  }

  dec() {
    this.setState(prevState => ({
      count: prevState.count - 1
    }));
    this.props.onDecrement();
  }

  render() {
    return (
      <div className="counter">
        <div className="value">[{this.state.count}]</div>
        <div className="buttons">
          <button onClick={() => this.inc()}>+</button>
          <button onClick={() => this.dec()}>-</button>
        </div>
      </div>
    );
  }
}

export default Counter;
