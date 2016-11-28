import dispatcher from './dispatcher';

const {actionsStream} = dispatcher;

export default actionsStream.do((action) => console.log(action))
