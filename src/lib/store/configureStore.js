import {types} from 'mobx-state-tree';
import {createContext, useContext} from 'react';
import Example, {ExampleState} from '@lib/store/ExampleStore';

const RootStore = types
  .model({
    example: Example,
  })
  .actions((store) => ({}));

export const rootStore = RootStore.create({
  example: ExampleState,
});

const RootStoreContext = createContext(null);

export const MSTProvider = RootStoreContext.Provider;

export function useStore() {
  const mstStore = useContext(RootStoreContext);
  if (mstStore === null) {
    throw new Error('Store cannot be null, please add a context provider');
  }
  return mstStore;
}

if (__DEV__) {
  const {connectReduxDevtools} = require('mst-middlewares');
  const remotedev = require('remotedev');

  connectReduxDevtools(remotedev, rootStore);
}
