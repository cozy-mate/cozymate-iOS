import { GetAxiosInstance, PostAxiosInstance, PutAxiosInstance } from '@axios/axios.method';
import { RegisterUserDataRequest, UpdateUserDataRequest } from '@server/requestTypes/member-stat';
import {
  GetUserDetailDataResponse,
  RegisterUserDataResponse,
  SearchUsersResponse,
  UpdateUserDataResponse,
} from '@server/responseTypes/member-stat';

// 사용자 상세정보 조회
export const getUserDetailData = async (): Promise<GetUserDetailDataResponse> => {
  const response = await GetAxiosInstance<GetUserDetailDataResponse>(`/members/stat/`);

  return response.data;
};

// 사용자 상세정보 필터링, 일치율 조회
export const searchUsers = async (page?: number): Promise<SearchUsersResponse> => {
  const response = await GetAxiosInstance<SearchUsersResponse>(`/members/stat/search`, {
    params: {
      page: page,
    },
  });

  return response.data;
};

// 사용자 상세정보 등록
export const registerUserData = async (
  data: RegisterUserDataRequest,
): Promise<RegisterUserDataResponse> => {
  const response = await PostAxiosInstance<RegisterUserDataResponse>(`/members/stat/`, data);

  return response.data;
};

// 사용자 상세정보 수정
export const updateUserData = async (
  data: UpdateUserDataRequest,
): Promise<UpdateUserDataResponse> => {
  const response = await PostAxiosInstance<UpdateUserDataResponse>(`/members/stat/`, data);

  return response.data;
};
