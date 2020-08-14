import AsyncStorage from '@react-native-community/async-storage';
import {mst} from 'reactotron-mst';
import Reactotron from 'reactotron-react-native';

const reactotron = Reactotron.configure({name: 'AppName'})
  .setAsyncStorageHandler(AsyncStorage)
  .useReactNative()
  .use(mst())
  .connect();

export default reactotron;
