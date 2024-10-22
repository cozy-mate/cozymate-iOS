import { atom } from 'recoil';

import { LifeStyle, BasicData } from './type';

export const lifeStyleState = atom<LifeStyle>({
  key: 'lifestyle',
  default: {
    universityId: 0,
    admissionYear: '',
    major: '',
    numOfRoommate: 0,
    acceptance: '',
    wakeUpMeridian: '',
    wakeUpTime: 0,
    sleepingMeridian: '',
    sleepingTime: 0,
    turnOffMeridian: '',
    turnOffTime: 0,
    smokingState: '',
    sleepingHabit: '',
    airConditioningIntensity: 0,
    heatingIntensity: 0,
    lifePattern: '',
    intimacy: '',
    canShare: false,
    isPlayGame: false,
    isPhoneCall: false,
    studying: '',
    intake: '',
    cleanSensitivity: 0,
    noiseSensitivity: 0,
    cleaningFrequency: '',
    personality: '',
    mbti: '',
    options: {
      '무조건 지켜줘야 해요!': [],
      '이정도는 맞춰줄 수 있어요!': [],
      '이건 절대 절대 안 돼요!': [],
    },
  },
});

export const MyLifeStyleState = atom<LifeStyle>({
  key: 'myLifeStyle',
  default: {
    universityId: 0,
    admissionYear: '',
    birthYear: 0,
    major: '',
    numOfRoommate: 0,
    acceptance: '',
    wakeUpMeridian: '',
    wakeUpTime: 0,
    sleepingMeridian: '',
    sleepingTime: 0,
    turnOffMeridian: '',
    turnOffTime: 0,
    smokingState: '',
    sleepingHabit: '',
    airConditioningIntensity: 0,
    heatingIntensity: 0,
    lifePattern: '',
    intimacy: '',
    canShare: false,
    isPlayGame: false,
    isPhoneCall: false,
    studying: '',
    intake: '',
    cleanSensitivity: 0,
    noiseSensitivity: 0,
    cleaningFrequency: '',
    personality: '',
    mbti: '',
    options: {
      '무조건 지켜줘야 해요!': [],
      '이정도는 맞춰줄 수 있어요!': [],
      '이건 절대 절대 안 돼요!': [],
    },
  },
});

export const OtherBasicData = atom<BasicData>({
  key: 'otherBasicData',
  default: {
    memberId: 0,
    memberName: '',
    memberNickName: '',
    memberAge: 0,
    memberPersona: 0,
    numOfRoommate: 0,
    equality: 0,
  },
});

export const OtherLifeStyleState = atom<LifeStyle>({
  key: 'otherLifeStyle',
  default: {
    universityId: 0,
    admissionYear: '',
    birthYear: 0,
    major: '',
    numOfRoommate: 0,
    acceptance: '',
    wakeUpMeridian: '',
    wakeUpTime: 0,
    sleepingMeridian: '',
    sleepingTime: 0,
    turnOffMeridian: '',
    turnOffTime: 0,
    smokingState: '',
    sleepingHabit: '',
    airConditioningIntensity: 0,
    heatingIntensity: 0,
    lifePattern: '',
    intimacy: '',
    canShare: false,
    isPlayGame: false,
    isPhoneCall: false,
    studying: '',
    intake: '',
    cleanSensitivity: 0,
    noiseSensitivity: 0,
    cleaningFrequency: '',
    personality: '',
    mbti: '',
    options: {
      '무조건 지켜줘야 해요!': [],
      '이정도는 맞춰줄 수 있어요!': [],
      '이건 절대 절대 안 돼요!': [],
    },
  },
});

export const feedRefreshState = atom<boolean>({
  key: 'needsRefresh',
  default: false,
});

export const postDetailRefreshState = atom<boolean>({
  key: 'postDetailRefresh',
  default: false,
});
