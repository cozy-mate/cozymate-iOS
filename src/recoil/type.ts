export type LifeStyle = {
  universityId: number;
  admissionYear: string;
  birthYear?: number;
  major: string;
  numOfRoommate: number | undefined;
  acceptance: string;
  wakeUpMeridian: string;
  wakeUpTime: number | undefined;
  sleepingMeridian: string;
  sleepingTime: number | undefined;
  turnOffMeridian: string;
  turnOffTime: number | undefined;
  smokingState: string;
  sleepingHabit: string;
  airConditioningIntensity: number | undefined;
  heatingIntensity: number | undefined;
  lifePattern: string;
  intimacy: string;
  canShare: boolean | undefined;
  isPlayGame: boolean | undefined;
  isPhoneCall: boolean | undefined;
  studying: string;
  intake: string;
  cleanSensitivity: number | undefined;
  noiseSensitivity: number | undefined;
  cleaningFrequency: string;
  personality: string;
  mbti: string;
  options: {
    '무조건 지켜줘야 해요!': string[];
    '이정도는 맞춰줄 수 있어요!': string[];
    '이건 절대 절대 안 돼요!': string[];
  };
};

export type BasicData = {
  memberId: number;
  memberName: string;
  memberNickName: string;
  memberAge: number;
  memberPersona: number;
  numOfRoommate: number;
  equality: number;
};
