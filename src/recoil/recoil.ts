import { atom } from 'recoil';
import { SignUp, LifeStyle, RoomInfo, CreateRoomInfo, InviteCodeRoomInfo, Profile } from './type';

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

export const hasRoomState = atom<boolean>({
  key: 'hasRoom',
  default: false,
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

export const feedRefreshState = atom<boolean>({
  key: 'needsRefresh',
  default: false,
});

export const postDetailRefreshState = atom<boolean>({
  key: 'postDetailRefresh',
  default: false,
});
