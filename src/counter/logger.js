import (default as {actionsStream}) from './dispatcher';

const {actionsStream} = dispatcher;

export default actionsStream.do((action) => console.log(action))
