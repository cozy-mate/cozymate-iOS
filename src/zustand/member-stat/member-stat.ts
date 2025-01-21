import { create } from 'zustand';

import { LifeStyle, DetailFilterList, RegisterLifeStyle } from './type';

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
  clearLifeStyle: () => void;
}>((set) => ({
  lifeStyle: {
    memberDetail: {
      memberId: 0,
      nickname: '',
      gender: '',
      birthday: '',
      universityName: '',
      majorName: '',
      persona: 0,
    },
    memberStatDetail: {
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
    equality: 0,
    roomId: 0,
  },
  setLifeStyle: (newLifeStyle) =>
    set((state) => ({
      lifeStyle: { ...state.lifeStyle, ...newLifeStyle },
    })),
  clearLifeStyle: () =>
    set(() => ({
      lifeStyle: {
        memberDetail: {
          memberId: 0,
          nickname: '',
          gender: '',
          birthday: '',
          universityName: '',
          majorName: '',
          persona: 0,
        },
        memberStatDetail: {
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
        equality: 0,
        roomId: 0,
      },
    })),
}));

export const useRegisterLifeStyleStore = create<{
  registerLifeStyle: RegisterLifeStyle;
  setRegisterLifeStyle: (newLifeStyle: Partial<RegisterLifeStyle>) => void;
}>((set) => ({
  registerLifeStyle: {
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
  setRegisterLifeStyle: (newLifeStyle) =>
    set((state) => ({
      registerLifeStyle: { ...state.registerLifeStyle, ...newLifeStyle },
    })),
}));

export const usePreferencesStore = create<{
  preferenceList: LifestyleOptionKey[];
  setPreferenceList: (status: LifestyleOptionKey[]) => void;
  clearPreferenceList: () => void;
}>((set) => ({
  preferenceList: [],
  setPreferenceList: (status) => set({ preferenceList: status }),
  clearPreferenceList: () =>
    set(() => ({
      preferenceList: [],
    })),
}));

export const useDetailFilterListStore = create<{
  initialValue: DetailFilterList;
  detailFilterList: DetailFilterList;
  setDetailFilterList: (status: Partial<DetailFilterList>) => void;
  clearDetailFilterList: () => void;
}>((set) => ({
  initialValue: {
    birthYear: [],
    admissionYear: [],
    majorName: [],
    acceptance: [],
    wakeUpTime: [],
    sleepingTime: [],
    turnOffTime: [],
    smoking: [],
    sleepingHabit: [],
    airConditioningIntensity: [],
    heatingIntensity: [],
    lifePattern: [],
    intimacy: [],
    canShare: [],
    isPlayGame: [],
    isPhoneCall: [],
    studying: [],
    intake: [],
    cleanSensitivity: [],
    noiseSensitivity: [],
    cleaningFrequency: [],
    drinkingFrequency: [],
    personality: [],
    mbti: [],
  },
  detailFilterList: {
    birthYear: [],
    admissionYear: [],
    majorName: [],
    acceptance: [],
    wakeUpTime: [],
    sleepingTime: [],
    turnOffTime: [],
    smoking: [],
    sleepingHabit: [],
    airConditioningIntensity: [],
    heatingIntensity: [],
    lifePattern: [],
    intimacy: [],
    canShare: [],
    isPlayGame: [],
    isPhoneCall: [],
    studying: [],
    intake: [],
    cleanSensitivity: [],
    noiseSensitivity: [],
    cleaningFrequency: [],
    drinkingFrequency: [],
    personality: [],
    mbti: [],
  },
  setDetailFilterList: (newFilter) =>
    set((state) => ({
      detailFilterList: { ...state.detailFilterList, ...newFilter },
    })),
  clearDetailFilterList: () =>
    set(() => ({
      detailFilterList: {
        birthYear: [],
        admissionYear: [],
        majorName: [],
        acceptance: [],
        wakeUpTime: [],
        sleepingTime: [],
        turnOffTime: [],
        smoking: [],
        sleepingHabit: [],
        airConditioningIntensity: [],
        heatingIntensity: [],
        lifePattern: [],
        intimacy: [],
        canShare: [],
        isPlayGame: [],
        isPhoneCall: [],
        studying: [],
        intake: [],
        cleanSensitivity: [],
        noiseSensitivity: [],
        cleaningFrequency: [],
        drinkingFrequency: [],
        personality: [],
        mbti: [],
      },
    })),
}));

export const useNewLifeStyleStore = create<{
  lifeStyle: RegisterLifeStyle;
  setNewLifeStyle: (newLifeStyle: Partial<RegisterLifeStyle>) => void;
  clearNewLifeStyle: () => void;
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
  setNewLifeStyle: (newLifeStyle) =>
    set((state) => ({
      lifeStyle: { ...state.lifeStyle, ...newLifeStyle },
    })),
  clearNewLifeStyle: () =>
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
