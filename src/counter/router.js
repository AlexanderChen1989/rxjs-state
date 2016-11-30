import {Observable} from '@reactivex/rxjs';
import React, {Component} from 'react'
import routeParser from 'route-parser'
import urlParser from 'url-parse'

import {combine} from '../halo';
import dispatcher from './dispatcher';
import {useQueries, createHashHistory} from 'history';


const {filterData, defineAction, dispatch} = dispatcher;

const Actions = defineAction('ROUTE_CHANGED');

const history = useQueries(createHashHistory)();

const locationChanged = ({location, route}) => {
  return !route ||
    location.pathname !== route.path ||
    location.search !== route.search
};

export const pushHistory =
  filterData(Actions.ROUTE_CHANGED)
    .do(route => {
      const currentLocation = history.getCurrentLocation()
      if (route.path !== currentLocation.pathname &&
        route.query !== currentLocation.query) {
        history.push({
          pathname: route.path,
          query: route.query
        })
      }
    });

export const location =
  Observable
    .fromEventPattern(history.listen)
    .startWith(history.getCurrentLocation());

export const route =
  filterData(Actions.ROUTE_CHANGED);

export const notifyHistoryChanged =
  combine({location, route})
    .filter(locationChanged)
    .do(({location}) => {
      dispatch(
        Actions.ROUTE_CHANGED,
        {
          path: location.pathname,
          query: location.query,
          search: location.search,
        },
      )
    });


export const changeRoute = (route) => {
  const url = urlParser(route);
  dispatch(Actions.ROUTE_CHANGED, {path: url.pathname, query: url.query})
}

export const match = (routes, component) => {
  let matchers = Array.isArray(routes) ? routes.map(routeParser) : [routeParser(routes)];

  const routeComponent = (props, context) => {
    const matcher = matchers.find((matcher) => matcher.match(context.route);

    if (matcher) {
      // match contains params
      return React.cloneElement(component, matcher.match(context.route))
    }

    return null
  }

  routeComponent.contextTypes = {
    route: React.PropTypes.string
  }

  return React.createElement(routeComponent)
}
