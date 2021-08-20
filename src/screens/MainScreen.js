import React, {memo} from 'react';
import {StyleSheet, Text, View} from 'react-native';

const MainScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Hello World!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

MainScreen.propTypes = {};

export default memo(MainScreen);
