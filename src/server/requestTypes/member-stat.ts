export interface RegisterUserDataRequest {
  universityId: number;
  admissionYear: string;
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
}

export interface UpdateUserDataRequest {
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
    '이건 절대 절대 안 돼요!': string[];
    '이정도는 맞춰줄 수 있어요!': string[];
  };
}
