import React from 'react';

import {subscribe} from '../halo';
import {count, decreaseCount, increaseCount} from './counterStore';

@subscribe({count, decreaseCount, increaseCount})
export default class Counter extends React.Component {
  render() {
    const {count, increaseCount, decreaseCount} = this.props;
    return (
      <div>
        <h1>{count}</h1>
        <button onClick={() => increaseCount(10)}>+</button>
        <button onClick={() => decreaseCount(10)}>-</button>
      </div>
    )
  }
}
