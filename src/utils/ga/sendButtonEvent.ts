import analytics from '@react-native-firebase/analytics';

import { ButtonEvent } from '@utils/ga/eventEnum';

export const sendButtonEvent = async (
  eventType: ButtonEvent,
  preferenceType?: string,
): Promise<void> => {
  try {
    await analytics().logEvent('버튼 클릭', {
      eventType: eventType,
      preferenceType: preferenceType,
    });
  } catch (e) {
    //console.error('sendButtonEvent error: ', e);
  }
};
