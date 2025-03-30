import { ExpoConfig, ConfigContext } from '@expo/config';
import { config } from 'dotenv';

config();

const apiUrl = process.env.EXPO_PUBLIC_API_URL;
const projectId = process.env.EXPO_PUBLIC_PROJECT_ID;
const kakaoNativeAppKey = process.env.EXPO_PUBLIC_KAKAO_NATIVE_APP_KEY;
const serviceUrlSchemeIOS = process.env.EXPO_PUBLIC_APP_BUNDLE_IDENTIFIER;

const defineConfig = (config: ConfigContext): ExpoConfig => ({
  ...config,
  owner: 'cozymate',
  name: 'cozymate',
  slug: 'cozymate',
  version: '1.0.0',
  orientation: 'portrait',
  icon: './assets/images/icon.png',
  scheme: 'myapp',
  userInterfaceStyle: 'automatic',
  newArchEnabled: true,
  extra: {
    router: {
      origin: false,
    },
    eas: {
      projectId: projectId,
    },
    apiUrl: apiUrl,
  },
  updates: {
    url: `https://u.expo.dev/${projectId}`,
  },
  runtimeVersion: '1.0.0',
  ios: {
    supportsTablet: false,
    bundleIdentifier: serviceUrlSchemeIOS,
    buildNumber: '1.0.0',
    usesAppleSignIn: true,
    infoPlist: {
      NSPhotoLibraryUsageDescription: '사진을 업로드하기 위해 갤러리 접근 권한이 필요합니다.',
      NSCameraUsageDescription: '사진을 찍기 위해 카메라 접근 권한이 필요합니다.',
    },
  },
  android: {
    adaptiveIcon: {
      foregroundImage: './assets/images/adaptive-icon.png',
      backgroundColor: '#ffffff',
    },
  },
  web: {
    bundler: 'metro',
    output: 'static',
    favicon: './assets/images/favicon.png',
  },
  plugins: [
    'expo-router',
    [
      'expo-splash-screen',
      {
        image: './assets/images/splash-icon.png',
        imageWidth: 200,
        resizeMode: 'contain',
        backgroundColor: '#ffffff',
      },
    ],
    [
      'expo-build-properties',
      {
        android: {
          extraMavenRepos: ['https://devrepo.kakao.com/nexus/content/groups/public/'],
        },
      },
    ],
    [
      '@react-native-kakao/core',
      {
        nativeAppKey: kakaoNativeAppKey,
        ios: {
          handleKakaoOpenUrl: true,
        },
      },
    ],
  ],
  experiments: {
    typedRoutes: true,
  },
});

export default defineConfig;
