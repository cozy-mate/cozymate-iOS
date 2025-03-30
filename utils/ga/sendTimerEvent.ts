import analytics from '@react-native-firebase/analytics';

let time: number | null = null;
let duration: number | null = null;

export const initTimer = (): void => {
  time = Date.now();
};

export const endTime = (): void => {
  const totalduration = Date.now() - (time as number);
  duration = totalduration;
  time = null;
};

export const sendTimerEvent = async (): Promise<void> => {
  endTime();

  if (duration) {
    try {
      await analytics().logEvent('Onboarding_Time', {
        duration_seconds: Math.floor(duration / 1000),
      });
    } catch (e) {
      console.error(e);
    } finally {
      duration = null;
    }
  }
};
