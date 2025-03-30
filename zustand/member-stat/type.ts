export interface RegisterLifeStyle {
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

  [key: string]: string | number | string[] | undefined;
}
