import React from 'react';
import ReactDOM from 'react-dom';
import Counter from './hello/Counter';
import logger from './hello/logger';

logger.subscribe(() => {});

ReactDOM.render(
  <Counter />,
  document.getElementById('app')
);

