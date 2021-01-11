import {Platform, StatusBar, Dimensions} from 'react-native';
import {isIphoneX} from 'react-native-iphone-x-helper';

const {height, width} = Dimensions.get('window');
const standardLength = width > height ? width : height;
const offset =
  width > height ? 0 : Platform.OS === 'ios' ? 78 : StatusBar.currentHeight; // iPhone X style SafeAreaView size in portrait

const deviceHeight =
  isIphoneX() || Platform.OS === 'android'
    ? standardLength - offset
    : standardLength;

const standardScreenHeight = 680;

export const scaleFont = (fontSize) => {
  return {
    fontSize: Math.round((fontSize * deviceHeight) / standardScreenHeight),
  };
};

export default {
  regular: (s = 12) => {
    return {
      ...scaleFont(s),
      fontFamily: 'Montserrat-Regular',
    };
  },
  medium: (s = 12) => {
    return {
      ...scaleFont(s),
      fontFamily: 'Montserrat-Medium',
    };
  },
  semiBold: (s = 12) => {
    return {
      ...scaleFont(s),
      fontFamily: 'Montserrat-SemiBold',
    };
  },
  bold: (s = 12) => {
    return {
      ...scaleFont(s),
      fontFamily: 'Montserrat-Bold',
    };
  },
  customWeight: (s = 12, weight = 0) => {
    return {
      ...scaleFont(s),
      fontFamily: 'Montserrat-Regular',
      fontWeight: String(weight),
    };
  },
};
