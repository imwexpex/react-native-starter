import {getParent, getRoot, types} from 'mobx-state-tree';

import {asyncModel} from '../models/asyncModel';

export function asyncAction(thunk, auto = true, throwable = true) {
  const flowModel = types.compose(
    asyncModel,
    types.model({}).actions((store) => ({
      async auto(promise) {
        try {
          store.start();

          await promise();

          store.success();
        } catch (err) {
          store.failed(err, throwable);
        }
      },

      run: (...args) => {
        const promise = () =>
          thunk(...args)(getParent(store), store, getRoot(store));

        if (auto) {
          return store.auto(promise);
        }

        return promise();
      },
    })),
  );

  return types.optional(flowModel, {});
}

export function returningAsyncAction(thunk) {
  const flowModel = types.compose(
    asyncModel,
    types.model({}).actions((store) => ({
      async auto(promise) {
        try {
          store.start();

          const value = await promise();

          store.success();

          return value;
        } catch (err) {
          store.failed(err, true);
        }

        return undefined;
      },

      run: (...args) => {
        const promise = () =>
          thunk(...args)(getParent(store), store, getRoot(store));

        return store.auto(promise);
      },
    })),
  );

  return types.optional(flowModel, {});
}

export function checkingAsyncAction(checkingThunk) {
  const flowModel = types.compose(
    asyncModel,
    types.model({}).actions((store) => ({
      async auto(promise) {
        try {
          store.start();

          await promise();

          store.success();
        } catch (err) {
          store.failed(err, true);
        }
      },

      run: (...args) => {
        const [shouldSkipFunction, thunk] = checkingThunk(...args);
        const promise = () => thunk(getParent(store), store, getRoot(store));

        if (!shouldSkipFunction(getParent(store), store, getRoot(store))) {
          return store.auto(promise);
        }

        return undefined;
      },
    })),
  );

  return types.optional(flowModel, {});
}

export default asyncAction;
