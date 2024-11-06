import { GetAxiosInstance } from '@axios/axios.method';

import {
  GetUniversityDataResponse,
  GetUniversityListResponse,
  GetUserUniversityResponse,
} from '@server/responseTypes/university';

// 사용자 대학교 조회
export const getUserUniversity = async (): Promise<GetUserUniversityResponse> => {
  const response = await GetAxiosInstance<GetUserUniversityResponse>(
    `/university/get-member-univ-info`,
  );

  return response.data;
};

// 대학교 전체 조회
export const getUniversityList = async (): Promise<GetUniversityListResponse> => {
  const response = await GetAxiosInstance<GetUniversityListResponse>(`/university/get-list`);

  return response.data;
};

// 대학교 조회
export const getUniversityData = async (
  universityId: number,
): Promise<GetUniversityDataResponse> => {
  const response = await GetAxiosInstance<GetUniversityDataResponse>(`/university/get-info`, {
    params: { universityId: universityId },
  });

  return response.data;
};
