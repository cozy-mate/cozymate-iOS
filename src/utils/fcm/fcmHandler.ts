import notifee, { EventType } from '@notifee/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import messaging from '@react-native-firebase/messaging';

/**
 * Display a notification using Notifee
 * @param {Object} remoteMessage - The Firebase Cloud Message
 */
export async function displayNotification(remoteMessage : any) {
  if (!remoteMessage?.notification) return;

  const { title, body } = remoteMessage.notification;

  await notifee.displayNotification({
    title: (title || '알림').replace(/{(.*?)}/g, '$1'),
    body: (body || '새로운 메시지가 도착했습니다.').replace(/{(.*?)}/g, '$1'),
    ios: {
      sound: 'default',
    },
  });
}

/**
 * Firebase background message handler
 * @param {Object} remoteMessage - The Firebase Cloud Message
 */
export async function handleBackgroundMessage(remoteMessage : any) {
  // console.log('[Background Message]', remoteMessage);
  // await displayNotification(remoteMessage);
  AsyncStorage.setItem('remoteMessage', JSON.stringify(remoteMessage));
}

// /**
//  * Notifee background event handler
//  * @param {Object} event - The Notifee background event
//  */
// export async function handleBackgroundEvent({ type , detail }:any) {
//   const { notification, pressAction } = detail;

//   console.log('Notification clicked in background');

//   if (type === EventType.ACTION_PRESS && pressAction.id === 'default') {
//     // console.log('Notification clicked in background');
//   }

//   if (notification?.id) {
//     await notifee.cancelNotification(notification.id);
//   }
// }

/**
 * Register background handlers for Firebase and Notifee
 */
export function registerFcmHandlers() {
  messaging().setBackgroundMessageHandler(handleBackgroundMessage);
}
