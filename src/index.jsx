import React from 'react'
import ReadDOM from 'react-dom'
import {Observable, Subject} from '@reactivex/rxjs'
import {Dispatcher, combineLatesObj} from './halo'

const {actions, filterAction} = new Dispatcher()

const Actions = actions({
  ROUTE_CHANGED: null, // {path: string, query: string}
  COUNTER_INCREASED: null,
  COUNTER_DECREASED: null,
})


ReadDOM.render(
  <h1>hello</h1>,
  document.getElementById('app')
)
