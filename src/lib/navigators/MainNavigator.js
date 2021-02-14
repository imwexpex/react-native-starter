import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import React from 'react';

import MainScreen from '@screens/MainScreen';

import colors from '@theme/colors';

import {NavigationRoutes} from '@navigation/NavigationRoutes';

import {navigationRef} from '@services/navigationService';

const Stack = createStackNavigator();

export const stackConfig = ({initialRouteName} = {}) => {
  return {
    headerMode: 'none',
    screenOptions: {
      ...TransitionPresets.SlideFromRightIOS,
    },
    initialRouteName,
  };
};

export const screenConfig = ({
  gestureDirection = 'horizontal',
  ...rest
} = {}) => {
  return {
    options: {
      gestureEnabled: true,
      cardStyle: {
        backgroundColor: colors.APP_BG,
      },
      cardOverlayEnabled: true,
      gestureDirection,
      ...rest,
    },
  };
};

const MainNavigator = () => {
  const initialRouteName = NavigationRoutes.MainScreen;

  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator
        {...stackConfig({
          initialRouteName,
        })}>
        <Stack.Screen
          name={NavigationRoutes.MainScreen}
          component={MainScreen}
          {...screenConfig()}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainNavigator;
