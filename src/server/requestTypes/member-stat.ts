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
  birthYear: number[];
  admissionYear: string[];
  majorName: string[];
  acceptance: string[];
  wakeUpTime: number[];
  sleepingTime: number[];
  turnOffTime: number[];
  smoking: string[];
  sleepingHabit: string[];
  airConditioningIntensity: number[];
  heatingIntensity: number[];
  lifePattern: string[];
  intimacy: number[];
  canShare: string[];
  isPlayGame: string[];
  isPhoneCall: string[];
  studying: string[];
  intake: string[];
  cleanSensitivity: number[];
  noiseSensitivity: number[];
  cleaningFrequency: string[];
  drinkingFrequency: string[];
  personality: string[];
  mbti: string[];
}

export interface GetFilteredMemberListCountRequest {
  birthYear: number[];
  admissionYear: string[];
  majorName: string[];
  acceptance: string[];
  wakeUpTime: number[];
  sleepingTime: number[];
  turnOffTime: number[];
  smoking: string[];
  sleepingHabit: string[];
  airConditioningIntensity: number[];
  heatingIntensity: number[];
  lifePattern: string[];
  intimacy: number[];
  canShare: string[];
  isPlayGame: string[];
  isPhoneCall: string[];
  studying: string[];
  intake: string[];
  cleanSensitivity: number[];
  noiseSensitivity: number[];
  cleaningFrequency: string[];
  drinkingFrequency: string[];
  personality: string[];
  mbti: string[];
}

export interface UpdateMemberStatRequest {
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
