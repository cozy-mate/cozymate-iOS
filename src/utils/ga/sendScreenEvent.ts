import analytics from '@react-native-firebase/analytics';

export const sendScreenEvent = async (eventType: string): Promise<void> => {
  try{
    await analytics().logEvent('Screen_Event', {
        eventType: eventType,
      });
  }catch(e){
    console.error('sendScreenEvent error: ', e);
  }
  
};
