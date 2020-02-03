import { applyMiddleware, combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import logger from 'redux-logger';
import { persistReducer, persistStore } from 'redux-persist';
import * as thunkMiddleware from 'redux-thunk';
import AsyncStorage from '@react-native-community/async-storage';
import createSagaMiddleware from 'redux-saga';
import { exampleReducer } from './reducers/exampleReducer';
import rootSaga from './sagas/rootSaga';
import Reactotron from '../config/reactotronConfig';

let sagaMiddleware = createSagaMiddleware(
  __DEV__ && {
    sagaMonitor: Reactotron.createSagaMonitor(),
  },
);

let middlewares = [thunkMiddleware.default, sagaMiddleware];

if (__DEV__) {
  middlewares.push(logger);
}

const persistConfig = {
  key: 'root',
  blacklist: [''],
  timeout: 0,
  storage: AsyncStorage,
};

const rootReducer = combineReducers({
  example: exampleReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(
  persistedReducer,
  composeWithDevTools(
    applyMiddleware(...middlewares),
    __DEV__ && Reactotron.createEnhancer(),
  ),
);

sagaMiddleware.run(rootSaga);
const persistor = persistStore(store);

if (__DEV__) {
  global.clearPersistCache = persistor.purge;
}

export { store, persistor };
