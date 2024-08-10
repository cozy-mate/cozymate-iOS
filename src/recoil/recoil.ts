import { atom } from 'recoil';
import { SignUp, LifeStyle, RoomInfo } from './type';

export const signUpState = atom<SignUp>({
  key: 'signup',
  default: {
    name: '',
    nickname: '',
    gender: '',
    birth: '',
    character: 0,
  },
});

export const loggedInState = atom<boolean>({
  key: 'isLoggedIn',
  default: false,
});

export const createRoomState = atom<RoomInfo>({
  key: 'roomInfo',
  default: {
    name: '',
    profileImage: 0,
    maxMateNum: 0,
    creatorId: 0,
  },
});

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
      additionalProp1: [],
      additionalProp2: [],
      additionalProp3: [],
    },
  },
});
