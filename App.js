import React from 'react';
import { Text, View } from 'react-native';
import { Provider as StoreProvider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from './src/lib/store/configureStore';

const App = () => {
  return (
    <StoreProvider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>Welcome to RNStarter Project</Text>
          <Text style={{ textAlign: 'center' }}>
            Libs: RNavigation 5 (Stack + Tabs), Redux, REanimated (Redash +
            Retween), GestureHandler
          </Text>
        </View>
      </PersistGate>
    </StoreProvider>
  );
};

export default App;
