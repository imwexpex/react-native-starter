import {NavigationRoutes} from '@navigation/NavigationRoutes';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import MainScreen from '@screens/MainScreen';
import {navigationRef} from '@services/navigationService';
import colors from '@theme/colors';
import React from 'react';

const Stack = createStackNavigator();

export const stackConfig = ({initialRouteName} = {}) => {
  return {
    screenOptions: {
      ...TransitionPresets.SlideFromRightIOS,
      headerShown: false,
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
