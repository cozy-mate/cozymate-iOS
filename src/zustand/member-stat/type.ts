export interface LifeStyle {
  memberDetail: {
    memberId: number;
    nickname: string;
    gender: string;
    birthday: string;
    universityName: string;
    majorName: string;
    persona: number;
  };
  memberStatDetail: {
    admissionYear: string;
    numOfRoommate: number | undefined;
    dormitoryName: string;
    acceptance: string;
    wakeUpMeridian: string;
    wakeUpTime: number | undefined;
    sleepingMeridian: string;
    sleepingTime: number | undefined;
    turnOffMeridian: string;
    turnOffTime: number | undefined;
    smoking: string;
    sleepingHabit: string[];
    airConditioningIntensity: number | undefined;
    heatingIntensity: number | undefined;
    lifePattern: string;
    intimacy: string;
    canShare: string;
    isPlayGame: string;
    isPhoneCall: string;
    studying: string;
    intake: string;
    cleanSensitivity: number | undefined;
    noiseSensitivity: number | undefined;
    cleaningFrequency: string;
    drinkingFrequency: string;
    personality: string[];
    mbti: string;
    selfIntroduction: string;
  };
  equality: number | null;
  roomId: number;
}

export interface RegisterLifeStyle {
  admissionYear: string;
  numOfRoommate: number;
  dormitoryName: string;
  acceptance: string;
  wakeUpMeridian: string;
  wakeUpTime: number;
  sleepingMeridian: string;
  sleepingTime: number;
  turnOffMeridian: string;
  turnOffTime: number;
  smoking: string;
  sleepingHabit: string[];
  airConditioningIntensity: number;
  heatingIntensity: number;
  lifePattern: string;
  intimacy: string;
  canShare: string;
  isPlayGame: string;
  isPhoneCall: string;
  studying: string;
  intake: string;
  cleanSensitivity: number;
  noiseSensitivity: number;
  cleaningFrequency: string;
  drinkingFrequency: string;
  personality: string[];
  mbti: string;
  selfIntroduction: string;
}
