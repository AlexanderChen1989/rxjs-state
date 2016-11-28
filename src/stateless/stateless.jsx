import {Subject} from '@reactivex/rxjs';

export const dispatcher = new Subject();
export const handlers = dispatcher.asObservable()
