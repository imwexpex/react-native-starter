module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    '@babel/plugin-proposal-optional-chaining',
    [
      'babel-plugin-module-resolver',
      {
        alias: {
          '@src': './src',
          '@screens': './src/screens',
          '@constants': './src/lib/constants',
          '@theme': './src/res/theme',
          '@navigation': './src/lib/navigators',
          '@graphql': './src/graphql',
          '@images': './src/res/images',
          '@hooks': './src/hooks',
          '@contexts': './src/contexts',
          '@components': './src/lib/components',
          '@res': './src/res',
          '@actions': './src/store/actions',
          '@utils': './src/lib/utils',
          '@api': './src/lib/api',
        },
      },
    ],
    'react-native-reanimated/plugin',
  ],
};
