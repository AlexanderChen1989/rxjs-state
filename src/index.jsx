import React from 'react';
import ReactDOM from 'react-dom';
import Counter from './counter/Counter';
import logger from './counter/logger';
import dispatcher from './counter/dispatcher';

window.dispatcher = dispatcher;

logger.subscribe(() => {});

ReactDOM.render(
  <Counter />,
  document.getElementById('app')
);

