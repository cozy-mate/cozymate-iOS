/**
 * @format
 */
import 'react-native-gesture-handler';
import 'react-native-reanimated';
import { AppRegistry } from 'react-native';

import App from './App';
import { name as appName } from './app.json';

import messaging from '@react-native-firebase/messaging';
import notifee from '@notifee/react-native';

messaging().setBackgroundMessageHandler(async (remoteMessage) => {
  console.log('[Background Message] ', remoteMessage);

  await notifee.displayNotification({
    title: remoteMessage?.notification.title.replace(/{(.*?)}/g, '$1') || '알림',
    body:
      remoteMessage?.notification.body.replace(/{(.*?)}/g, '$1') || '새로운 메시지가 도착했습니다.',
    ios: {
      sound: 'default',
    },
  });
});

notifee.onBackgroundEvent(async ({ type, detail }) => {
  const { notification, pressAction } = detail;

  if (type === EventType.ACTION_PRESS && pressAction.id === 'default') {
    //console.log('백그라운드에서 알림 클릭 처리');
  }

  await notifee.cancelNotification(notification.id);
});

function HeadlessCheck({ isHeadless }) {
  if (isHeadless) {
    // App has been launched in the background by iOS, ignore
    return null;
  }

  // Render the app component on foreground launch
  return <App />;
}

AppRegistry.registerComponent(appName, () => HeadlessCheck);
