module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    'react-native-reanimated/plugin',
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
        alias: {
          tests: ['./tests/'],
          '@components': './src/components',
          '@api': './src/api',
          '@constants': './src/constants',
          '@hooks': './src/hooks',
          '@routes': './src/routes',
          '@screen': './src/screen',
          '@utils': './src/utils',
          '@icons': './src/icons',
          '@types': './src/types',
        },
      },
    ],
  ],
};
