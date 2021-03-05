import {observer} from 'mobx-react-lite';
import PropTypes from 'prop-types';
import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {MMKV} from 'react-native-mmkv';
import {useAsyncEffect} from '@lib/hooks/useAsyncEffect';
import {rootStore} from '@lib/store/configureStore';
import {persist} from '@utils/persist';

const MSTPersist = observer(({children}) => {
  const [rehydrated, setRehydrated] = useState(false);

  useAsyncEffect(async () => {
    try {
      await persist('rootStore', rootStore, {
        storage: MMKV,
        jsonify: true,
        whitelist: ['example'],
      });
    } finally {
      setRehydrated(true);
    }
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
