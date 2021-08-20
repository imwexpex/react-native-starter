import {getEnv, getRoot, types} from 'mobx-state-tree';

const ErrorModel = types.model({
  message: types.maybeNull(types.frozen()),
  status: types.maybeNull(types.number),
  reason: types.maybeNull(types.string),
  errorCode: types.maybeNull(types.string),
  meta: types.maybeNull(types.frozen({})),
});

function maybeSetRequestSource(store) {
  if (store.requestSource !== null) {
    store.setRequestSource(null);
  }
}

export const asyncModel = types
  .model({
    inProgress: false,
    inProgressRetry: false,
    error: types.optional(types.maybeNull(ErrorModel), null),
    hasEverBeenRun: false,
    throwable: false,
  })

  .volatile(() => ({
    requestSource: null,
  }))

  .views(store => ({
    get errorMessage() {
      return store?.error?.message ?? null;
    },

    get isError() {
      return Boolean(store.error);
    },

    get Api() {
      return getEnv(getRoot(store)).Api;
    },

    get canBeRun() {
      return !store.error && !store.inProgress;
    },

    get inProgressAgain() {
      return store.inProgress && store.hasEverBeenRun;
    },

    get inProgressInitial() {
      return store.inProgress && !store.hasEverBeenRun;
    },
  }))
  .actions(store => ({
    setRequestSource(source) {
      if (source === null) {
        store.requestSource = null;
      } else {
        store.requestSource = {
          token: source.token,
          cancel: () => {
            store.setRequestSource(null);
            source.cancel();
          },
        };
      }
    },

    cancelRequest() {
      store.requestSource?.cancel();
    },

    start(retry = false) {
      if (retry) {
        store.inProgressRetry = true;
      } else {
        store.inProgress = true;
      }

      maybeSetRequestSource(store);

      store.error = null;
    },

    success() {
      if (!store.hasEverBeenRun) {
        store.hasEverBeenRun = true;
      }

      if (store.inProgressRetry) {
        store.inProgressRetry = false;
      } else {
        store.inProgress = false;
      }

      maybeSetRequestSource(store);
    },

    failed(err, throwError = store.throwable) {
      if (!store.hasEverBeenRun) {
        store.hasEverBeenRun = true;
      }

      if (__DEV__) {
        const Reactotron = require('reactotron-react-native').default;
        const {message, stack} = err;
        if (stack) {
          Reactotron.error(message, stack);
        } else {
          Reactotron.log(`Error:\n${message}`);
        }
      }

      if (store.inProgressRetry) {
        store.inProgressRetry = false;
      } else {
        store.inProgress = false;
      }

      const response = err?.response;

      store.error = {
        message: response?.data?.message ?? err?.message,
        status: response?.status ?? null,
        reason: response?.data?.reason ?? null,
        errorCode: response?.data?.error ?? null,
        meta: response?.data?.meta ?? null,
      };

      if (throwError) {
        throw err;
      }
    },

    throwError(value) {
      store.throwable = value;
    },

    merge(collection, scheme) {
      const {result, entities} = store.normalize(collection, scheme);

      getRoot(store).entities.merge(entities);

      return {
        result,
      };
    },
  }));
