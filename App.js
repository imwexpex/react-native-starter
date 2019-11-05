import React from 'react';
import { View } from 'react-native';
import { Provider as StoreProvider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from './src/lib/store/configureStore';

const App = () => {
  return (
    <StoreProvider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <View />
      </PersistGate>
    </StoreProvider>
  );
};

export default App;
