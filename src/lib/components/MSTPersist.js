import {rootStore} from '@lib/store/configureStore';
import {persist} from '@utils/persist';
import {observer} from 'mobx-react-lite';
import PropTypes from 'prop-types';
import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const MSTPersist = observer(({children}) => {
  const [rehydrated, setRehydrated] = useState(false);

  useEffect(() => {
    const init = async () => {
      try {
        await persist('rootStore', rootStore, {
          storage: AsyncStorage,
          jsonify: true,
          whitelist: ['user'],
        });
      } finally {
        setRehydrated(true);
      }
    };

    init();
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
  },
});

MSTPersist.propTypes = {
  children: PropTypes.element.isRequired,
};

export default MSTPersist;
