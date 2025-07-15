export interface UnblockMemberResponse {
  result: string;
}

export interface GetMemberBlockStatusResponse {
  result: boolean;
}

export interface GetBlockedMemberListResponse {
  result: {
    memberId: number;
    nickname: string;
  }[];
}

export interface BlockMemberResponse {
  result: string;
}
