import { DeleteAxiosInstance, GetAxiosInstance, PostAxiosInstance } from '@/axios/axios.method';

import {
  CreateMemberLikeResponse,
  DeleteMemberLikeResponse,
  GetMemberLikeListResponse,
} from './response';

// 사용자 찜 삭제
export const deleteMemberLike = async (
  memberFavoriteId: number,
): Promise<DeleteMemberLikeResponse> => {
  const response = await DeleteAxiosInstance<DeleteMemberLikeResponse>(
    `/favorites/members/${memberFavoriteId}`,
  );

  return response.data;
};

// 찜한 사용자 목록 조회
export const getMemberLikeList = async (
  page?: number,
  size?: number,
): Promise<GetMemberLikeListResponse> => {
  const response = await GetAxiosInstance<GetMemberLikeListResponse>(`/favorites/members`, {
    params: {
      page,
      size,
    },
  });

  return response.data;
};

// 사용자 찜하기
export const createMemberLike = async (memberId: number): Promise<CreateMemberLikeResponse> => {
  const response = await PostAxiosInstance<CreateMemberLikeResponse>(
    `/favorites/members/${memberId}`,
  );

  return response.data;
};
