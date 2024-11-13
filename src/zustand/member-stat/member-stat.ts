import { create } from 'zustand';

import { LifeStyle } from './type';

import { LifestyleOptionKey } from '@utils/getLifeStyleIcon';

export const useHasLifeStyleStore = create<{
  hasLifeStyle: boolean;
  setHasLifeStyle: (status: boolean) => void;
}>((set) => ({
  hasLifeStyle: false,
  setHasLifeStyle: (status) => set({ hasLifeStyle: status }),
}));

export const useLifeStyleStore = create<{
  lifeStyle: LifeStyle;
  setLifeStyle: (newLifeStyle: Partial<LifeStyle>) => void;
}>((set) => ({
  lifeStyle: {
    admissionYear: '',
    numOfRoommate: 0,
    dormitoryName: '',
    acceptance: '',
    wakeUpMeridian: '',
    wakeUpTime: 0,
    sleepingMeridian: '',
    sleepingTime: 0,
    turnOffMeridian: '',
    turnOffTime: 0,
    smoking: '',
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

export const usePreferencesStore = create<{
  preferenceList: LifestyleOptionKey[];
  setPreferenceList: (status: LifestyleOptionKey[]) => void;
}>((set) => ({
  preferenceList: [],
  setPreferenceList: (status) => set({ preferenceList: status }),
}));
