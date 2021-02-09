import {Platform, StatusBar, Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');

const DEVICE_BASE_WIDTH = 375; // iPhone 6 width
const REAL_WIDTH = height > width ? width : height;

export const scaleFont = (fontSize) => {
  return {
    fontSize: Math.round((fontSize * REAL_WIDTH) / DEVICE_BASE_WIDTH),
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
