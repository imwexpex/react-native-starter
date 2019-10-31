import { applyMiddleware, combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import logger from 'redux-logger';
import { persistReducer, persistStore } from 'redux-persist';
import * as thunkMiddleware from 'redux-thunk';
import AsyncStorage from '@react-native-community/async-storage';
import { exampleReducer } from './reducers/exampleReducer';

let middlewares = [thunkMiddleware.default];

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
  composeWithDevTools(applyMiddleware(...middlewares)),
);
const persistor = persistStore(store);

export { store, persistor };
