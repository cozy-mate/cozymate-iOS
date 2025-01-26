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
  console.log('duration', duration);
  if (duration) {
    await analytics().logEvent('온보딩 시간', {
      time,
    });
    duration = null;
  }
};
