import MainNavigator from '@navigation/MainNavigator';
import React, {useEffect} from 'react';
import RNBootSplash from 'react-native-bootsplash';
import {MSTProvider, rootStore} from '@lib/store/configureStore';
import MSTPersist from '@components/MSTPersist';
import {locale} from '@res/strings/locale';
import AsyncStorage from '@react-native-async-storage/async-storage';

const App = () => {
  useEffect(() => {
    const init = async () => {
      const language = await AsyncStorage.getItem('language');
      if (language) {
        locale.setLanguage(language);
      }

      RNBootSplash.hide({fade: true});
    };

    init();
  }, []);

  return (
    <MSTProvider value={rootStore}>
      <MSTPersist>
        <MainNavigator />
      </MSTPersist>
    </MSTProvider>
  );
};

export default App;
