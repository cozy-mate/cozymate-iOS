export interface GetUserDetailDataResponse {
  result: {
    universityId: number;
    admissionYear: string;
    birthYear: number;
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
}

export interface GetOtherUserDetailDataResponse {
  result: {
    universityId: number;
    admissionYear: string;
    birthYear: number;
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
}

export interface CheckDormitoryNumResponse {
  result: number;
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

export interface GetFilteredMemberListResponse {
  result: {
    page: number;
    hasNext: boolean;
    result: {
      memberId: number;
      memberName: string;
      memberNickName: string;
      memberAge: number;
      memberPersona: number;
      numOfRoommate: number;
      equality: number;
    }[];
  };
}

export interface GetFilteredMemberListCountResponse {
  result: number;
}

export interface UpdateUserDataResponse {
  result: number;
}
