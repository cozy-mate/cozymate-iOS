export type SignUp = {
  name: string;
  nickname: string;
  gender: string;
  birthday: string;
  persona: number;
};

export type Profile = {
  name: string;
  nickname: string;
  gender: string;
  birthday: string;
  persona: number;
};

export type CreateRoomInfo = {
  name: string;
  profileImage: number;
  maxMateNum: number;
};

export type RoomInfo = {
  roomId: number;
  name: string;
  inviteCode: string;
  profileImage: number;
};

export type InviteCodeRoomInfo = {
  roomId: number;
  name: string;
  managerName: string;
  maxMateNum: number;
};

export type LifeStyle = {
  universityId: number;
  admissionYear: string;
  major: string;
  numOfRoommate: number;
  acceptance: string;
  wakeUpMeridian: string;
  wakeUpTime: number;
  sleepingMeridian: string;
  sleepingTime: number;
  turnOffMeridian: string;
  turnOffTime: number;
  smokingState: string;
  sleepingHabit: string;
  airConditioningIntensity: number;
  heatingIntensity: number;
  lifePattern: string;
  intimacy: string;
  canShare: boolean;
  isPlayGame: boolean;
  isPhoneCall: boolean;
  studying: string;
  intake: string;
  cleanSensitivity: number;
  noiseSensitivity: number;
  cleaningFrequency: string;
  personality: string;
  mbti: string;
  options: {
    '무조건 지켜줘야 해요!': string[];
    '이정도는 맞춰줄 수 있어요!': string[];
    '이건 절대 절대 안 돼요!': string[];
  };
};
