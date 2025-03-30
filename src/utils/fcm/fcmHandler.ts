import notifee from '@notifee/react-native';
import { FirebaseMessagingTypes } from '@react-native-firebase/messaging';

/**
 * Firebase background message handler
 * @param {Object} remoteMessage - The Firebase Cloud Message
 */
export const displayBackgroundNotification = async (
  title: string | object,
  content: string | object,
  data: any,
): Promise<string> => {
  return notifee.displayNotification({
    title: title as string,
    body: content as string,
    data: data,
  });
};

export const onMessageReceivedBackground = async (
  message: FirebaseMessagingTypes.RemoteMessage,
): Promise<void> => {
  const title = message?.data?.title || '알림';
  const body = message?.data?.body || '새로운 메시지가 도착했습니다.';
  const data = message?.data;
  await displayBackgroundNotification(title, body, data);
};
