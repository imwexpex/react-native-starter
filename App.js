import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import RNBootSplash from 'react-native-bootsplash';

import {useAsyncEffect} from '@lib/hooks/useAsyncEffect';
import {MSTProvider, rootStore} from '@lib/store/configureStore';

import MainNavigator from '@navigation/MainNavigator';

import MSTPersist from '@components/MSTPersist';

import {locale} from '@res/strings/locale';

const App = () => {
  useAsyncEffect(async () => {
    const language = await AsyncStorage.getItem('language');
    if (language) {
      locale.setLanguage(language);
    }

    await RNBootSplash.hide({fade: true});
  });

  return (
    <MSTProvider value={rootStore}>
      <MSTPersist>
        <MainNavigator />
      </MSTPersist>
    </MSTProvider>
  );
};

export default App;
