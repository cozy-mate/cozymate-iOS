export interface GetUserDetailDataResponse {
  result: {
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
}

export interface GetOtherUserDetailDataResponse {
  result: {
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
}

export interface SearchedUsers {
  memberId: number;
  memberName: string;
  memberNickName: string;
  memberAge: number;
  memberPersona: number;
  numOfRoommate: number;
  equality: number;
}

export interface SearchUsersResponse {
  result: {
    page: number;
    hasNext: boolean;
    result: SearchedUsers[];
  };
}

export interface RegisterUserDataResponse {
  result: number;
}

export interface UpdateUserDataResponse {
  result: number;
}
