module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugin: [
    // native-wind 설정
    ['nativewind/babel'],
    // alias 설정
    [
      'module-resolver',
      {
        root: ['.'],
        extensions: [
          '.js',
          '.jsx',
          '.ts',
          '.tsx',
          '.android.js',
          '.android.tsx',
          '.ios.js',
          '.ios.tsx',
        ],
        alias: {
          '@providers': './src/providers',
          '@components': './src/components',
          '@hooks': './src/hooks',
          '@pages': './src/pages',
          '@routes': './src/routes',
          '@type': './src/type',
          '@utils': './src/utils',
          '@assets': './src/assets',
          '@recoil': './src/recoil',
          '@server': './src/server',
          '@axios': './src/axios',
        },
      },
    ],
  ],
};
