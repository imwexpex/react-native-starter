import {CommonActions, StackActions} from '@react-navigation/native';
import * as React from 'react';

export const navigationRef = React.createRef();

function getCurrentRoute(route) {
  if (route.routes) {
    return getCurrentRoute(route.routes[route.index]);
  } else if (route.state) {
    return getCurrentRoute(route.state.routes[route.state.index]);
  }
  return route.name;
}

export function navigate(next, params) {
  navigationRef.current?.dispatch(CommonActions.navigate(next, params));
}

export function push(next, params) {
  navigationRef.current?.dispatch(StackActions.push(next, params));
}

export function replace(next, params) {
  if (getCurrentRoute(navigationRef.current?.getRootState()) !== next) {
    navigationRef.current?.dispatch(StackActions.replace(next, params));
  }
}

export function reset(next, params) {
  navigationRef.current?.reset({
    routes: [
      {
        name: next,
        params,
      },
    ],
  });
}

export function getActiveRouteName(state) {
  const route = state.routes[state.index];

  if (route.state) {
    return getActiveRouteName(route.state);
  }

  return route.name;
}
