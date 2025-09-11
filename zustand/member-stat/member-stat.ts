import { create } from 'zustand';

import { RegisterLifeStyle, ShowLifeStyleInput } from './type';

export const useRegisterLifeStyleStore = create<{
  lifeStyle: RegisterLifeStyle;
  setLifeStyle: (newLifeStyle: Partial<RegisterLifeStyle>) => void;
  clearLifeStyle: () => void;
}>((set) => ({
  lifeStyle: {
    dormName: '',
    numOfRoommate: '',
    admissionYear: undefined,
    dormJoiningStatus: '',
    wakeUpTime: undefined,
    sleepingTime: undefined,
    turnOffTime: undefined,
    smokingStatus: '',
    sleepingHabits: undefined,
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
    personalities: undefined,
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
        sleepingHabits: undefined,
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
        personalities: undefined,
        mbti: '',
        selfIntroduction: '',
      },
    })),
}));

export const useShowLifeStyleInputStore = create<{
  showLifeStyleInput: ShowLifeStyleInput;
  setShowLifeStyleInput: (newStatus: Partial<ShowLifeStyleInput>) => void;
  clearShowLifeStyleInput: () => void;
}>((set) => ({
  showLifeStyleInput: {
    // 기본정보
    showAdmissionYear: true,
    showDormName: false,
    showNumOfRoommate: false,
    showDormJoiningStatus: false,

    // 필수정보
    showWakeUpTime: true,
    showSleepingTime: false,
    showTurnOffTime: false,
    showSmokingStatus: false,
    showSleepingHabits: false,
    showCoolingIntensity: false,
    showHeatingIntensity: false,
    showLifePattern: false,
    showIntimacy: false,
    showSharingStatus: false,
    showGamingStatus: false,
    showCallingStatus: false,
    showStudyingStatus: false,
    showEatingStatus: false,
    showCleannessSensitivity: false,
    showNoiseSensitivity: false,
    showCleaningFrequency: false,
    showDrinkingFrequency: false,
    showPersonalities: false,
    showMbti: false,
  },
  setShowLifeStyleInput: (newStatus) =>
    set((state) => ({
      showLifeStyleInput: { ...state.showLifeStyleInput, ...newStatus },
    })),
  clearShowLifeStyleInput: () =>
    set(() => ({
      showLifeStyleInput: {
        // 기본정보
        showAdmissionYear: true,
        showDormName: false,
        showNumOfRoommate: false,
        showDormJoiningStatus: false,

        // 필수정보
        showWakeUpTime: true,
        showSleepingTime: false,
        showTurnOffTime: false,
        showSmokingStatus: false,
        showSleepingHabits: false,
        showCoolingIntensity: false,
        showHeatingIntensity: false,
        showLifePattern: false,
        showIntimacy: false,
        showSharingStatus: false,
        showGamingStatus: false,
        showCallingStatus: false,
        showStudyingStatus: false,
        showEatingStatus: false,
        showCleannessSensitivity: false,
        showNoiseSensitivity: false,
        showCleaningFrequency: false,
        showDrinkingFrequency: false,
        showPersonalities: false,
        showMbti: false,
      },
    })),
}));
