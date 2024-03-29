module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    '@babel/plugin-syntax-jsx',
    [
      'babel-plugin-module-resolver',
      {
        alias: {
          '@src': './src',
          '@lib': './src/lib',
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
          '@services': './src/lib/services',
        },
      },
    ],
    'react-native-reanimated/plugin',
  ],
};
