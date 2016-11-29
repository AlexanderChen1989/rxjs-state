import dispatcher from './dispatcher';

const {actionStream} = dispatcher;

export default actionStream.do((action) => console.log(action))
