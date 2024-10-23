import { create } from 'zustand';

import { LifeStyle } from './type';

export const useLifeStyleStore = create<{
  lifeStyle: LifeStyle;
  setLifeStyle: (newLifeStyle: Partial<LifeStyle>) => void;
}>((set) => ({
  lifeStyle: {
    admissionYear: '',
    numOfRoommate: 0,
    acceptance: '',
    wakeUpMeridian: '',
    wakeUpTime: 0,
    sleepingMeridian: '',
    sleepingTime: 0,
    turnOffMeridian: '',
    turnOffTime: 0,
    smokingState: '',
    sleepingHabit: [],
    airConditioningIntensity: 0,
    heatingIntensity: 0,
    lifePattern: '',
    intimacy: '',
    canShare: '',
    isPlayGame: '',
    isPhoneCall: '',
    studying: '',
    intake: '',
    cleanSensitivity: 0,
    noiseSensitivity: 0,
    cleaningFrequency: '',
    drinkingFrequency: '',
    personality: [],
    mbti: '',
    selfIntroduction: '',
  },
  setLifeStyle: (newLifeStyle) =>
    set((state) => ({
      lifeStyle: { ...state.lifeStyle, ...newLifeStyle },
    })),
}));
