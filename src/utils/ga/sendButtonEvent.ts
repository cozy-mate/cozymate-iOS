import analytics from '@react-native-firebase/analytics';

import { ButtonEvent } from '@utils/ga/eventEnum';

export const sendButtonEvent = async (
  eventType: ButtonEvent,
  preferenceType?: string,
): Promise<void> => {
  try {
    await analytics().logEvent('Button_Click', {
      eventType: eventType,
      preferenceType: preferenceType,
    });
  } catch (e) {
    //console.error('sendButtonEvent error: ', e);
  }
};

export const sendNavBarEvent = async (
  eventType: ButtonEvent,
  screenName : string,
): Promise<void> => {
  try{
    await analytics().logEvent('NavBar_Click', {
      eventType:`${screenName} 클릭`
    });
    
  }catch(e){
    //console.error('sendNavBarEvent error: ', e);
  }
}