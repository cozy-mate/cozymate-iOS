module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    // Native Wind 설정
    ['nativewind/babel'],
    ['react-native-reanimated/plugin'],
    // Alias 설정
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
          '@layout': './src/layout',
          '@pages': './src/pages',
          '@routes': './src/routes',
          '@type': './src/type',
          '@utils': './src/utils',
          '@assets': './src/assets',
          '@zustand': './src/zustand',
          '@recoil': './src/recoil',
          '@server': './src/server',
          '@axios': './src/axios',
        },
      },
    ],
  ],
};
