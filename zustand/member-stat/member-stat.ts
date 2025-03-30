import { create } from 'zustand';

import { RegisterLifeStyle } from './type';

export const useHasLifeStyleStore = create<{
  hasLifeStyle: boolean;
  setHasLifeStyle: (newState: boolean) => void;
}>((set) => ({
  hasLifeStyle: false,
  setHasLifeStyle: (newState: boolean) => set({ hasLifeStyle: newState }),
}));

export const useRegisterLifeStyleStore = create<{
  lifeStyle: RegisterLifeStyle;
  setLifeStyle: (newLifeStyle: Partial<RegisterLifeStyle>) => void;
  clearLifeStyle: () => void;
}>((set) => ({
  lifeStyle: {
    admissionYear: '',
    numOfRoommate: undefined,
    dormitoryName: '',
    acceptance: '',
    wakeUpMeridian: '',
    wakeUpTime: undefined,
    sleepingMeridian: '',
    sleepingTime: undefined,
    turnOffMeridian: '',
    turnOffTime: undefined,
    smoking: '',
    sleepingHabit: [],
    airConditioningIntensity: undefined,
    heatingIntensity: undefined,
    lifePattern: '',
    intimacy: '',
    canShare: '',
    isPlayGame: '',
    isPhoneCall: '',
    studying: '',
    intake: '',
    cleanSensitivity: undefined,
    noiseSensitivity: undefined,
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
  clearLifeStyle: () =>
    set(() => ({
      lifeStyle: {
        admissionYear: '',
        numOfRoommate: undefined,
        dormitoryName: '',
        acceptance: '',
        wakeUpMeridian: '',
        wakeUpTime: undefined,
        sleepingMeridian: '',
        sleepingTime: undefined,
        turnOffMeridian: '',
        turnOffTime: undefined,
        smoking: '',
        sleepingHabit: [],
        airConditioningIntensity: undefined,
        heatingIntensity: undefined,
        lifePattern: '',
        intimacy: '',
        canShare: '',
        isPlayGame: '',
        isPhoneCall: '',
        studying: '',
        intake: '',
        cleanSensitivity: undefined,
        noiseSensitivity: undefined,
        cleaningFrequency: '',
        drinkingFrequency: '',
        personality: [],
        mbti: '',
        selfIntroduction: '',
      },
    })),
}));
