import analytics from '@react-native-firebase/analytics';

import { ButtonEvent } from '@utils/ga/eventEnum';

export const sendButtonEvent = async (
  eventType: ButtonEvent,
  preferenceType?: string,
): Promise<void> => {
  try {
    if (preferenceType) {
      await analytics().logEvent('Button_Click', {
        eventType: `${eventType} 클릭`,
        preferenceType: preferenceType,
      });
      return;
    }
    await analytics().logEvent('Button_Click', {
      eventType: `${eventType} 클릭`,
    });
  } catch (e) {
    //console.error('sendButtonEvent error: ', e);
  }
};

export const sendNavBarEvent = async (screenName: string): Promise<void> => {
  try {
    await analytics().logEvent('NavBar_Click', {
      eventType: `${screenName} 버튼 클릭`,
    });
  } catch (e) {
    //console.error('sendNavBarEvent error: ', e);
  }
};
