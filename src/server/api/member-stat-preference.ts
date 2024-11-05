import { GetAxiosInstance, PutAxiosInstance, PostAxiosInstance } from '@axios/axios.method';

import {
  AddPreferenceListRequest,
  UpdatePreferenceListRequest,
} from '@server/requestTypes/member-stat-preference';
import {
  AddPreferenceListResponse,
  GetPreferenceListResponse,
  UpdatePreferenceListResponse,
} from '@server/responseTypes/member-stat-preference';

// 멤버 선호 항목 조회
export const getPreferenceList = async (): Promise<GetPreferenceListResponse> => {
  const response = await GetAxiosInstance<GetPreferenceListResponse>(`/members/stat/preference`);

  return response.data;
};

// 멤버 선호 항목 생성
export const addPreferenceList = async (
  data: AddPreferenceListRequest,
): Promise<AddPreferenceListResponse> => {
  const response = await PostAxiosInstance<AddPreferenceListResponse>(
    `/members/stat/preference`,
    data,
  );

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
