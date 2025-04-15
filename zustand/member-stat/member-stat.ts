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
    dormName: '',
    numOfRoommate: '',
    admissionYear: '',
    dormJoiningStatus: '',
    wakeUpTime: undefined,
    sleepingTime: undefined,
    turnOffTime: undefined,
    smokingStatus: '',
    sleepingHabits: [],
    coolingIntensity: '',
    heatingIntensity: '',
    lifePattern: '',
    intimacy: '',
    sharingStatus: '',
    gamingStatus: '',
    callingStatus: '',
    studyingStatus: '',
    eatingStatus: '',
    cleannessSensitivity: '',
    noiseSensitivity: '',
    cleaningFrequency: '',
    drinkingFrequency: '',
    personalities: [],
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
        dormName: '',
        numOfRoommate: '',
        admissionYear: '',
        dormJoiningStatus: '',
        wakeUpTime: undefined,
        sleepingTime: undefined,
        turnOffTime: undefined,
        smokingStatus: '',
        sleepingHabits: [],
        coolingIntensity: '',
        heatingIntensity: '',
        lifePattern: '',
        intimacy: '',
        sharingStatus: '',
        gamingStatus: '',
        callingStatus: '',
        studyingStatus: '',
        eatingStatus: '',
        cleannessSensitivity: '',
        noiseSensitivity: '',
        cleaningFrequency: '',
        drinkingFrequency: '',
        personalities: [],
        mbti: '',
        selfIntroduction: '',
      },
    })),
}));
