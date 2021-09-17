import {onSnapshot, applySnapshot, getSnapshot} from 'mobx-state-tree';
import _cloneDeep from 'lodash.clonedeep';
import _merge from 'lodash.merge';
import {MMKV} from 'react-native-mmkv';

export const storage = new MMKV({
  id: 'persist-storage',
});

export const persist = (name, store, options = {}) => {
  let {jsonify = true, whitelist} = options;

  if (!storage) {
    return Promise.reject(
      'localStorage (the default storage engine) is not ' +
        'supported in this environment. Please configure a different storage ' +
        'engine via the `storage:` option.',
    );
  }

  onSnapshot(store, _snapshot => {
    const snapshot = _cloneDeep(_snapshot);

    Object.keys(snapshot).forEach(key => {
      if (whitelist[key]) {
        Object.keys(snapshot[key]).forEach(snapKey => {
          if (!whitelist[key].includes(snapKey)) {
            if (snapshot?.[key]?.[snapKey]) {
              delete snapshot?.[key]?.[snapKey];
            }
          }
        });
      } else {
        delete snapshot?.[key];
      }
    });

    const data = !jsonify ? snapshot : JSON.stringify(snapshot);

    storage.set(name, data);
  });

  const data = storage.getString(name);

  if (!data) {
    return;
  }

  applySnapshot(store, _merge({}, getSnapshot(store), JSON.parse(data)));
};

export default persist;
