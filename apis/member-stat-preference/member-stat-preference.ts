import { GetAxiosInstance, PutAxiosInstance } from '@/axios/axios.method';

import { UpdatePreferenceListRequest } from './request';
import { GetPreferenceListResponse, UpdatePreferenceListResponse } from './response';

// 멤버 선호 항목 조회
export const getPreferenceList = async (): Promise<GetPreferenceListResponse> => {
  const response = await GetAxiosInstance<GetPreferenceListResponse>(`/members/stat/preference`);

  return response.data;
};

// 멤버 선호 항목 업데이트
export const updatePreferenceList = async (
  data: UpdatePreferenceListRequest,
): Promise<UpdatePreferenceListResponse> => {
  const response = await PutAxiosInstance<UpdatePreferenceListResponse>(
    `/members/stat/preference`,
    data,
  );

  return response.data;
};
