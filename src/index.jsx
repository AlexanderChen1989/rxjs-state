import React from 'react';
import ReactDOM from 'react-dom';
import Counter from './counter/Counter';
import logger from './counter/logger';

logger.subscribe(() => {});

ReactDOM.render(
  <Counter />,
  document.getElementById('app')
);

