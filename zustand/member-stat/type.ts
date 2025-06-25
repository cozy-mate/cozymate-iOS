export interface RegisterLifeStyle {
  dormName: string;
  numOfRoommate: string;
  admissionYear: string | undefined;
  dormJoiningStatus: string;
  wakeUpTime: number | undefined;
  sleepingTime: number | undefined;
  turnOffTime: number | undefined;
  smokingStatus: string;
  sleepingHabits: string[] | undefined;
  coolingIntensity: string;
  heatingIntensity: string;
  lifePattern: string;
  intimacy: string;
  sharingStatus: string;
  gamingStatus: string;
  callingStatus: string;
  studyingStatus: string;
  eatingStatus: string;
  cleannessSensitivity: string;
  noiseSensitivity: string;
  cleaningFrequency: string;
  drinkingFrequency: string;
  personalities: string[] | undefined;
  mbti: string;
  selfIntroduction: string;

  [key: string]: string | number | string[] | undefined;
}

export interface ShowLifeStyleInput {
  // 기본정보
  showAdmissionYear: boolean;
  showDormName: boolean;
  showNumOfRoommate: boolean;
  showDormJoiningStatus: boolean;

  // 필수정보
  showWakeUpTime: boolean;
  showSleepingTime: boolean;
  showTurnOffTime: boolean;
  showSmokingStatus: boolean;
  showSleepingHabits: boolean;
  showCoolingIntensity: boolean;
  showHeatingIntensity: boolean;
  showLifePattern: boolean;
  showIntimacy: boolean;
  showSharingStatus: boolean;
  showGamingStatus: boolean;
  showCallingStatus: boolean;
  showStudyingStatus: boolean;
  showEatingStatus: boolean;
  showCleannessSensitivity: boolean;
  showNoiseSensitivity: boolean;
  showCleaningFrequency: boolean;
  showDrinkingFrequency: boolean;
  showPersonalities: boolean;
  showMbti: boolean;
}
