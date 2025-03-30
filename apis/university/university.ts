import { GetAxiosInstance } from '@/axios/axios.method';

import {
  GetMyUniversityInfoResponse,
  GetUniversityInfoResponse,
  GetUniversityListResponse,
} from './response';

// 사용자 대학교 조회
export const getMyUniversityInfo = async (): Promise<GetMyUniversityInfoResponse> => {
  const response = await GetAxiosInstance<GetMyUniversityInfoResponse>(
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
export const getUnivesityInfo = async (
  universityId: number,
): Promise<GetUniversityInfoResponse> => {
  const response = await GetAxiosInstance<GetUniversityInfoResponse>(`/university/get-info`, {
    params: {
      universityId,
    },
  });

  return response.data;
};
