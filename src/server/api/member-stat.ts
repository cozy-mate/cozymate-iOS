import { GetAxiosInstance, PutAxiosInstance, PostAxiosInstance } from '@axios/axios.method';

import {
  UpdateMemberStatRequest,
  RegisterMemberStatRequest,
  GetFilteredMemberListRequest,
  GetFilteredMemberListCountRequest,
} from '@server/requestTypes/member-stat';
import {
  SearchMembersResponse,
  GetRandomMemberResponse,
  UpdateMemberStatResponse,
  CheckDormitoryNumResponse,
  GetMemberStatDataResponse,
  RegisterMemberStatResponse,
  GetFilteredMemberListResponse,
  SearchMemberByKeywordResponse,
  GetOtherMemberStatDataResponse,
  GetFilteredMemberListCountResponse,
} from '@server/responseTypes/member-stat';

// 사용자 상세정보 조회
export const getMemberStatData = async (): Promise<GetMemberStatDataResponse> => {
  const response = await GetAxiosInstance<GetMemberStatDataResponse>(`/members/stat`);

  return response.data;
};

// 사용자 상세정보 조회 (타인용)
export const getOtherMemberStatData = async (
  memberId: number,
): Promise<GetOtherMemberStatDataResponse> => {
  const response = await GetAxiosInstance<GetOtherMemberStatDataResponse>(
    `/members/stat/${memberId}`,
  );

  return response.data;
};

// 사용자 검색
export const searchMemberByKeyword = async (
  keyword: string,
): Promise<SearchMemberByKeywordResponse> => {
  const response = await GetAxiosInstance<SearchMemberByKeywordResponse>(`/members/stat/search`, {
    params: {
      keyword: keyword,
    },
  });

  return response.data;
};

// 사용자 랜덤 추천
export const getRandomMember = async (): Promise<GetRandomMemberResponse> => {
  const response = await GetAxiosInstance<GetRandomMemberResponse>(`/members/stat/random`);

  return response.data;
};

// 기숙사 인원 미정 여부 조회
export const checkDormitoryNum = async (): Promise<CheckDormitoryNumResponse> => {
  const response = await GetAxiosInstance<CheckDormitoryNumResponse>(`/members/stat/numOfRoommate`);

  return response.data;
};

// 사용자 상세정보 필터링 완전 일치 필터링 및 일치율 조회
export const searchMembers = async (
  page?: number,
  filterList?: string[],
): Promise<SearchMembersResponse> => {
  const response = await GetAxiosInstance<SearchMembersResponse>(`/members/stat/filter`, {
    params: {
      page: page,
      filterList: filterList,
    },
  });

  return response.data;
};

// 사용자 상세정보 등록
export const registerMemberStat = async (
  data: RegisterMemberStatRequest,
): Promise<RegisterMemberStatResponse> => {
  const response = await PostAxiosInstance<RegisterMemberStatResponse>(`/members/stat`, data);

  return response.data;
};

// 사용자 상세정보를 키-값으로 필터링하고, 사용자 목록 받아오기 (일치율 포함)
export const getFilteredMemberList = async (
  data: GetFilteredMemberListRequest,
  page?: number,
): Promise<GetFilteredMemberListResponse> => {
  const response = await PostAxiosInstance<GetFilteredMemberListResponse>(
    `/members/stat/filter/search`,
    data,
    {
      params: { page: page },
    },
  );

  return response.data;
};

// 사용자 상세정보를 키-값으로 필터링하고, 필터링에 맞는 인원 수 리턴받기
export const getFilteredMemberListCount = async (
  data: GetFilteredMemberListCountRequest,
): Promise<GetFilteredMemberListCountResponse> => {
  const response = await GetAxiosInstance<GetFilteredMemberListCountResponse>(
    `/members/stat/filter/search/count`,
    data,
  );

  return response.data;
};

// 사용자 상세정보 수정
export const updateMemberStat = async (
  data: UpdateMemberStatRequest,
): Promise<UpdateMemberStatResponse> => {
  const response = await PutAxiosInstance<UpdateMemberStatResponse>(`/members/stat`, data);

  return response.data;
};
