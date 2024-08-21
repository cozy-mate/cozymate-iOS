import { atom } from 'recoil';
import {
  SignUp,
  LifeStyle,
  RoomInfo,
  CreateRoomInfo,
  InviteCodeRoomInfo,
  Profile,
  MyRoom,
  BasicData,
} from './type';

export const signUpState = atom<SignUp>({
  key: 'signup',
  default: {
    name: '',
    nickname: '',
    gender: '',
    birthday: '',
    persona: 0,
  },
});

export const profileState = atom<Profile>({
  key: 'profile',
  default: {
    name: '',
    nickname: '',
    gender: '',
    birthday: '',
    persona: 0,
  },
});

export const loggedInState = atom<boolean>({
  key: 'isLoggedIn',
  default: false,
});

export const hasRoomState = atom<MyRoom>({
  key: 'hasRoom',
  default: {
    hasRoom: false,
    roomId: 0,
  },
});

export const createRoomState = atom<CreateRoomInfo>({
  key: 'createRoomInfo',
  default: {
    name: '',
    profileImage: 0,
    maxMateNum: 0,
  },
});

export const roomInfoState = atom<RoomInfo>({
  key: 'roomInfo',
  default: {
    roomId: 0,
    name: '',
    inviteCode: '',
    profileImage: 0,
    mateList: [
      {
        memberId: 0,
        mateId: 0,
        nickname: '',
      },
    ],
  },
});

export const inviteCodeRoomState = atom<InviteCodeRoomInfo>({
  key: 'inviteCodeRoomInfo',
  default: {
    roomId: 0,
    name: '',
    managerName: '',
    maxMateNum: 0,
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
