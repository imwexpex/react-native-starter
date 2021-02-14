import React, {memo} from 'react';
import {StyleSheet, View} from 'react-native';

const MainScreen = () => {
  return <View style={styles.container}></View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

MainScreen.propTypes = {};

export default memo(MainScreen);
