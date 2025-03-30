import { BaseResponse } from '@/type/baseResponse';
import { MemberItem } from '@/type/member';

export interface GetMemberDetailResponse extends BaseResponse {
  result: {
    memberDetail: {
      memberId: number;
      nickname: string;
      gender: string;
      birthday: string;
      universityName: string;
      universityId: number;
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
    isRoomPublic: boolean;
    hasRequestedRoomEntry: boolean;
    favoriteId: number;
  };
}

export interface GetRandomMemberListResponse {
  result: {
    memberList: MemberItem[];
  };
}

export interface GetMemberListResponse {
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
        universityId: number;
        majorName: string;
        persona: number;
      };
      equality: number;
      preferenceStats: {
        stat: string;
        value: string;
        color: string;
      }[];
    }[];
  };
}

export interface CreateMemberDetailResponse {
  result: number;
}
