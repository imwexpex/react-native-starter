import React, {useEffect} from 'react';
import {View} from 'react-native';
import RNBootSplash from 'react-native-bootsplash';
import {MSTProvider, rootStore} from './src/lib/store/configureStore';
import MSTPersist from '@components/MSTPersist';

const App = () => {
  useEffect(() => {
    RNBootSplash.hide({duration: 250});
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
