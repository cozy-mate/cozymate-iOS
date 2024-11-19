/**
 * @format
 */
import 'react-native-reanimated';
import { Text } from 'react-native';
import 'react-native-gesture-handler';
import { AppRegistry } from 'react-native';

import App from './App';
import { name as appName } from './app.json';

import { registerFcmHandlers } from '@utils/fcm/fcmHandler';

Text.defaultProps = Text.defaultProps || {};
Text.defaultProps.allowFontScaling = false;

registerFcmHandlers();

function HeadlessCheck({ isHeadless }) {
  if (isHeadless) {
    // App has been launched in the background by iOS, ignore
    return null;
  }

  // Render the app component on foreground launch
  return <App />;
}

AppRegistry.registerComponent(appName, () => HeadlessCheck);
