import {rootStore} from '@lib/store/configureStore';
import AsyncStorage from '@react-native-community/async-storage';
import colors from '@theme/colors';
import {persist} from '@utils/persist';
import {observer} from 'mobx-react-lite';
import PropTypes from 'prop-types';
import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';

const MSTPersist = observer(({children}) => {
  const [rehydrated, setRehydrated] = useState(false);

  useEffect(() => {
    persist('rootStore', rootStore, {
      storage: AsyncStorage,
      jsonify: true,
      whitelist: ['user'],
    }).then(() => {
      setRehydrated(true);
    });
  }, []);

  if (!rehydrated) {
    return <View style={[styles.container]} />;
  } else {
    return children;
  }
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.APP_BG,
  },
});

MSTPersist.propTypes = {
  children: PropTypes.element.isRequired,
};

export default MSTPersist;
