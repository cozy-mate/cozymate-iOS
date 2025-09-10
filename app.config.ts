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
  scheme: 'cozymate',
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
      NSUserNotificationUsageDescription: '푸시 알림을 통해 중요한 알림을 받을 수 있습니다.',
      NSAppTransportSecurity: {
        NSAllowsArbitraryLoads: true,
      },
      UIBackgroundModes: ['remote-notification'],
      aps: {
        alert: true,
        badge: true,
        sound: true,
      },
      // http3 비활성화, 켜놓으면 GA 전송이 안됩니다!
      NSHTTP3Enabled: false,
    },
    googleServicesFile: process.env.GOOGLE_SERVICES_JSON ?? './GoogleService-Info.plist',
  },
  android: {
    package: 'umc.cozymate',
    adaptiveIcon: {
      foregroundImage: './assets/images/adaptive-icon.png',
      backgroundColor: '#ffffff',
    },
    googleServicesFile: './google-services.json',
  },
  web: {
    bundler: 'metro',
    output: 'static',
    favicon: './assets/images/favicon.png',
  },
  plugins: [
    'expo-router',
    [
      'expo-font',
      {
        fonts: [
          './assets/fonts/SpaceMono-Regular.ttf',
          './assets/fonts/Pretendard-Bold.otf',
          './assets/fonts/Pretendard-SemiBold.otf',
          './assets/fonts/Pretendard-Medium.otf',
          './assets/fonts/Pretendard-Regular.otf',
        ],
      },
    ],
    'expo-web-browser',
    [
      'expo-build-properties',
      {
        android: {
          extraMavenRepos: ['https://devrepo.kakao.com/nexus/content/groups/public/'],
        },
        ios: {
          useFrameworks: 'static',
          podfileProperties: {
            use_modular_headers: true,
          },
        },
      },
    ],
    [
      '@react-native-kakao/core',
      {
        nativeAppKey: kakaoNativeAppKey,
        android: {
          authCodeHandlerActivity: true,
        },
        ios: {
          handleKakaoOpenUrl: true,
        },
      },
    ],
    [
      '@react-native-firebase/app',
      {
        ios: {
          googleServicesFile: process.env.GOOGLE_SERVICES_JSON ?? './GoogleService-Info.plist',
        },
      },
    ],
    [
      '@react-native-firebase/messaging',
      {
        ios: {
          capabilities: ['remote-notification'],
          backgroundModes: ['remote-notification'],
        },
      },
    ],
    [
      'expo-notifications',
      {
        ios: { skipNativeNotificationListener: true },
        android: { skipNativeNotificationListener: true },
      },
    ],
  ],
  experiments: {
    typedRoutes: true,
  },
});

export default defineConfig;
