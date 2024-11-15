import { LifestyleOptionKey } from '@utils/getLifeStyleIcon';

export interface DeleteFavoriteResponse {
  result: string;
}

export interface GetFavoriteRoomListResponse {
  result: {
    favoriteId: number;
    equality: number;
    roomId: number;
    name: string;
    preferenceMatchCountList: {
      preferenceName: string;
      count: number;
    }[];
    hashtagList: [];
    maxMateNum: number;
    currentMateNum: number;
  }[];
}

export interface GetFavoriteUserListResponse {
  result: {
    favoriteId: number;
    memberStatPreferenceDetail: {
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
      preferenceStats: Record<LifestyleOptionKey, string | number | null>;
    };
  }[];
}

export interface DibsOnRoomResponse {
  result: string;
}

export interface DibsOnUserResponse {
  result: string;
}
