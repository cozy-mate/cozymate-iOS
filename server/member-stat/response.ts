import { MemberData, MemberItem } from '@/type/member';
import { MemberStatItem } from '@/type/member-stat';

export interface GetMemberDetailResponse {
  result: {
    memberDetail: MemberData;
    memberStatDetail: MemberStatItem;
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
    memberList: MemberItem[];
  };
}

export interface CreateMemberDetailResponse {
  result: number;
}

export interface UpdateMemberDetailResponse {
  result: number;
}

export interface SearchUserResponse {
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
    equality: number;
  }[];
}
