import { GetAxiosInstance, PostAxiosInstance } from '@/axios/axios.method';

import { CreateMemberDetailRequest } from './request';
import {
  CreateMemberDetailResponse,
  GetMemberDetailResponse,
  GetMemberListResponse,
  GetRandomMemberListResponse,
} from './response';

// 내 상세정보 조회
export const getMyDetail = async (): Promise<GetMemberDetailResponse> => {
  const response = await GetAxiosInstance<GetMemberDetailResponse>(`/members/stat`);

  return response.data;
};

// 사용자 상세정보 조회
export const getMemberDetail = async (memberId: number): Promise<GetMemberDetailResponse> => {
  const response = await GetAxiosInstance<GetMemberDetailResponse>(`/members/stat/${memberId}`);

  return response.data;
};

// 사용자 검색

// 사용자 랜덤 추천
export const getRandomMemberList = async (): Promise<GetRandomMemberListResponse> => {
  const response = await GetAxiosInstance<GetRandomMemberListResponse>(`/members/stat/random`);

  return response.data;
};

// 기숙사 인원 미정 여부 조회

// 사용자 상세정보 완전 일치 필터링 및 일치율 조회
export const getMemberList = async (
  page: number,
  filterList?: string[],
): Promise<GetMemberListResponse> => {
  const response = await GetAxiosInstance<GetMemberListResponse>(`/members/stat/filter`, {
    params: { page, filterList },
  });

  return response.data;
};

// 사용자 상세정보 등록
export const createMemberDetail = async (
  data: CreateMemberDetailRequest,
): Promise<CreateMemberDetailResponse> => {
  const response = await PostAxiosInstance<CreateMemberDetailResponse>(`/members/stat`, data);

  return response.data;
};

// 사용자 상세정보를 키-값으로 필터링하고, 사용자 목록받아오기(일치율 포함)
// 사용자 상세정보를 키-값으로 필터링하고, 필터링에 맞는 인원 수를 리턴합니다
// 사용자 상세정보 수정
