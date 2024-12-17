/**
 * @format
 */
import 'react-native-reanimated';
import { Linking, Text } from 'react-native';
import 'react-native-gesture-handler';
import { AppRegistry } from 'react-native';

import App from './App';
import { name as appName } from './app.json';
import messaging from '@react-native-firebase/messaging';

Text.defaultProps = Text.defaultProps || {};
Text.defaultProps.allowFontScaling = false;

messaging().setBackgroundMessageHandler(async remoteMessage => {
    onMessageReceived(remoteMessage);
});

function HeadlessCheck({ isHeadless }) {
  if (isHeadless) {
    <AppFake />;
  }
  
  return (
    <App />
  );
}

const AppFake = () => {
    return null;
};

const onMessageReceived = (message) => {
  console.log('background message: ', message);
  // 'background message: ', { messageId: '1734439254225579',
  // data: 
  //  { body: '포비님, 12월 Best, Worst 코지메이트를 선정해주세요!',
  //    actionType: 'SELECT_COZY_MATE',
  //    title: 'cozymate' },
  // contentAvailable: true,
  // notification: 
  //  { body: '포비님, 12월 Best, Worst 코지메이트를 선정해주세요!',
  //    sound: 'default',
  //    title: 'cozymate' },
  // from: '664308711746' }
  

  if(message.data.actionType === 'SELECT_COZY_MATE') {
     Linking.openURL('cozymate://main/role');
  }
  
}

AppRegistry.registerComponent(appName, () => HeadlessCheck);
