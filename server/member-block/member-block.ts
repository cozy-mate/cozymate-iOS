import { DeleteAxiosInstance, GetAxiosInstance, PostAxiosInstance } from '@/axios/axios.method';

import {
  BlockMemberResponse,
  GetBlockedMemberListResponse,
  GetMemberBlockStatusResponse,
  UnblockMemberResponse,
} from './response';

// 멤버 차단 해제
export const unblockMember = async (memberId: number): Promise<UnblockMemberResponse> => {
  const response = await DeleteAxiosInstance<UnblockMemberResponse>(`/block/members/${memberId}`);

  return response.data;
};

// 특정 멤버 차단 여부 조회
export const getMemberBlockStatus = async (
  memberId: number,
): Promise<GetMemberBlockStatusResponse> => {
  const response = await GetAxiosInstance<GetMemberBlockStatusResponse>(
    `/block/members/${memberId}`,
  );

  return response.data;
};

// 멤버 차단 목록 조회
export const getBlockedMemberList = async (): Promise<GetBlockedMemberListResponse> => {
  const response = await GetAxiosInstance<GetBlockedMemberListResponse>(`/block/members`);

  return response.data;
};

// 멤버 차단
export const blockMember = async (memberId: number): Promise<BlockMemberResponse> => {
  const response = await PostAxiosInstance<BlockMemberResponse>(`/block/members/${memberId}`);

  return response.data;
};
