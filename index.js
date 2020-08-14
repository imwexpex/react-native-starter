/**
 * @format
 */

import 'react-native-gesture-handler';
import {rootStore} from '@lib/store/configureStore';
import React from 'react';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

if (__DEV__) {
  const Reactotron = require('@src/lib/config/reactotronConfig').default;
  Reactotron.trackMstNode(rootStore);
}

AppRegistry.registerComponent(appName, () => App);
