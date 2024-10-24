import { GetAxiosInstance, PutAxiosInstance, PostAxiosInstance } from '@axios/axios.method';

import { UpdateUserDataRequest, RegisterUserDataRequest } from '@server/requestTypes/member-stat';
import {
  SearchUsersResponse,
  UpdateUserDataResponse,
  RegisterUserDataResponse,
  GetUserDetailDataResponse,
  CheckDormitoryNumResponse,
  GetFilteredMemberListResponse,
  GetOtherUserDetailDataResponse,
  GetFilteredMemberListCountResponse,
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

// 기숙사 인원 미정 여부 조회
export const checkDormitoryNum = async (): Promise<CheckDormitoryNumResponse> => {
  const response = await GetAxiosInstance<CheckDormitoryNumResponse>(`/members/stat/numOfRoommate`);

  return response.data;
};

// 사용자 상세정보 필터링, 일치율 조회
export const searchUsers = async (
  filterList?: string[],
  page?: number,
  needsDetail?: boolean,
): Promise<SearchUsersResponse> => {
  const response = await GetAxiosInstance<SearchUsersResponse>(`/members/stat/filter`, {
    params: {
      filterList: filterList,
      page: page,
      needsDetail: needsDetail,
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

// 사용자 상세정보를 키-값으로 필터링하고, 사용자 목록 받아오기 (일치율 포함)
export const getFilteredMemberList = async (
  page?: number,
  needsDetail?: boolean,
): Promise<GetFilteredMemberListResponse> => {
  const response = await GetAxiosInstance<GetFilteredMemberListResponse>(
    `/members/stat/filter/search`,
    {
      params: { page: page, needsDetail: needsDetail },
    },
  );

  return response.data;
};

// 사용자 상세정보를 키-값으로 필터링하고, 사용자 목록 받아오기 (일치율 포함)
export const getFilteredMemberListCount = async (): Promise<GetFilteredMemberListCountResponse> => {
  const response = await GetAxiosInstance<GetFilteredMemberListCountResponse>(
    `/members/stat/filter/search/count`,
  );

  return response.data;
};

// 사용자 상세정보 수정
export const updateUserData = async (
  data: UpdateUserDataRequest,
): Promise<UpdateUserDataResponse> => {
  const response = await PutAxiosInstance<UpdateUserDataResponse>(`/members/stat`, data);

  return response.data;
};
