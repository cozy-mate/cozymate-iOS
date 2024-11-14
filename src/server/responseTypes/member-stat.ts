export interface GetMemberStatDataResponse {
  result: {
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
    equality: number | null;
    roomId: number;
  };
}

export interface GetOtherMemberStatDataResponse {
  result: {
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
    equality: number | null;
    roomId: number;
  };
}

export interface SearchMemberByKeywordResponse {
  result: {
    memberDetail: {
      memberId: number;
      nickname: string;
      gender: string;
      birthday: string;
      universityName: string;
      majorName: string;
      persona: number;
    };
    equality: number;
  }[];
}

export interface GetRandomMemberResponse {
  result: {
    memberList: {
      memberDetail: {
        memberId: number;
        nickname: string;
        gender: string;
        birthday: string;
        universityName: string;
        majorName: string | null;
        persona: number;
      };
      equality: number;
      preferenceStats: Record<string, string | number | null>;
    }[];
  };
}

export interface CheckDormitoryNumResponse {
  result: number;
}

export interface SearchMembersResponse {
  result: {
    page: number;
    hasNext: boolean;
    memberList: {
      memberDetail: {
        memberId: number;
        nickname: string;
        gender: string;
        birthday: string;
        universityName: string;
        majorName: string;
        persona: number;
      };
      equality: number;
      preferenceStats: Record<string, string | number>;
    }[];
  };
}

export interface RegisterMemberStatResponse {
  result: number;
}

export interface GetFilteredMemberListResponse {
  result: {
    page: number;
    hasNext: boolean;
    memberList: {
      memberDetail: {
        memberId: number;
        nickname: string;
        gender: string;
        birthday: string;
        universityName: string;
        majorName: string;
        persona: number;
      };
      equality: number;
      preferenceStats: Record<string, string | number>;
    }[];
  };
}

export interface GetFilteredMemberListCountResponse {
  result: number;
}

export interface UpdateMemberStatResponse {
  result: number;
}
