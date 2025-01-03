/**
 * @format
 */
import 'react-native-reanimated';
import { Text } from 'react-native';
import 'react-native-gesture-handler';
import { AppRegistry } from 'react-native';
import messaging from '@react-native-firebase/messaging';

import App from './App';
import { name as appName } from './app.json';

import { onMessageReceivedBackground } from '@utils/fcm/fcmHandler';

Text.defaultProps = Text.defaultProps || {};
Text.defaultProps.allowFontScaling = false;

messaging().setBackgroundMessageHandler(async (remoteMessage) => {
  onMessageReceivedBackground(remoteMessage);
});

const AppFake = () => {
  return null;
};

function HeadlessCheck({ isHeadless }) {
  if (isHeadless) {
    <AppFake />;
  }

  return <App />;
}

AppRegistry.registerComponent(appName, () => HeadlessCheck);
