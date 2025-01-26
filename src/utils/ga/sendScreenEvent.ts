import analytics from '@react-native-firebase/analytics';

export const sendScreenEvent = async (eventType: string): Promise<void> => {
  await analytics().logEvent('화면 접속', {
    eventType: eventType,
  });
};
