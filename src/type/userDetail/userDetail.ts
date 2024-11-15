export interface ListViewProps {
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
  };
  openModal: () => void;
}

export interface TableViewProps {
  userData: {
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
    };
  };
  otherUserData: {
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
    };
  };
  openModal: () => void;
}
