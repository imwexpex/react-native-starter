import React, {useEffect} from 'react';
import {View} from 'react-native';
import RNBootSplash from 'react-native-bootsplash';
import {MSTProvider, rootStore} from './src/lib/store/configureStore';
import MSTPersist from '@components/MSTPersist';
import {locale} from './src/res/strings/locale';
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
        <View />
      </MSTPersist>
    </MSTProvider>
  );
};

export default App;
