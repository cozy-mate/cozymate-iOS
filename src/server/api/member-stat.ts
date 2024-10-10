import { GetAxiosInstance, PutAxiosInstance, PostAxiosInstance } from '@axios/axios.method';

import { UpdateUserDataRequest, RegisterUserDataRequest } from '@server/requestTypes/member-stat';
import {
  SearchUsersResponse,
  UpdateUserDataResponse,
  RegisterUserDataResponse,
  GetUserDetailDataResponse,
  GetOtherUserDetailDataResponse,
} from '@server/responseTypes/member-stat';

// 사용자 상세정보 조회
export const getUserDetailData = async (): Promise<GetUserDetailDataResponse> => {
  const response = await GetAxiosInstance<GetUserDetailDataResponse>(`/members/stat`);

  return response.data;
};

// 사용자 상세정보 조회 (타인용)
export const getOtherUserDetailData = async (
  memberId: number,
): Promise<GetOtherUserDetailDataResponse> => {
  const response = await GetAxiosInstance<GetOtherUserDetailDataResponse>(
    `/members/stat/${memberId}`,
  );

  return response.data;
};

// 사용자 상세정보 필터링, 일치율 조회
export const searchUsers = async (
  filterList?: string[],
  page?: number,
): Promise<SearchUsersResponse> => {
  const response = await GetAxiosInstance<SearchUsersResponse>(`/members/stat/search`, {
    params: {
      page: page,
      filterList: filterList,
    },
  });

  return response.data;
};

// 사용자 상세정보 등록
export const registerUserData = async (
  data: RegisterUserDataRequest,
): Promise<RegisterUserDataResponse> => {
  const response = await PostAxiosInstance<RegisterUserDataResponse>(`/members/stat`, data);

  return response.data;
};

// 사용자 상세정보 수정
export const updateUserData = async (
  data: UpdateUserDataRequest,
): Promise<UpdateUserDataResponse> => {
  const response = await PostAxiosInstance<UpdateUserDataResponse>(`/members/stat`, data);

  return response.data;
};
