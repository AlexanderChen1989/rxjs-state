import React from 'react';
import ReactDOM from 'react-dom';
import Counter from './counter/Counter';
import logger from './counter/logger';
import {location} from './counter/router';


location.subscribe((location) => {
  console.log(location)
})


logger.subscribe(() => {});

ReactDOM.render(
  <Counter />,
  document.getElementById('app')
);

