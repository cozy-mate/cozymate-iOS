export interface RegisterMemberStatRequest {
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
}

export interface GetFilteredMemberListRequest {
  [key: string]: (number | string)[];
}

export interface GetFilteredMemberListCountRequest {
  [key: string]: (number | string)[];
}

export interface UpdateMemberStatRequest {
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
