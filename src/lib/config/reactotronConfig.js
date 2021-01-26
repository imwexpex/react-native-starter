import AsyncStorage from '@react-native-async-storage/async-storage';
import {NativeModules} from 'react-native';
import {mst} from 'reactotron-mst';
import Reactotron from 'reactotron-react-native';

const reactotron = Reactotron.configure({
  name: 'app',
  host: NativeModules.SourceCode.scriptURL.split('://')[1].split(':')[0],
})
  .setAsyncStorageHandler(AsyncStorage)
  .useReactNative()
  .use(mst())
  .connect();

export default reactotron;
