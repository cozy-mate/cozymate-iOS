import { GetAxiosInstance, PostAxiosInstance, PutAxiosInstance } from '@/axios/axios.method';

import { CreatePreferenceListRequest, UpdatePreferenceListRequest } from './request';
import {
  CreatePreferenceListResponse,
  GetPreferenceListResponse,
  UpdatePreferenceListResponse,
} from './response';

// 멤버 선호 항목 조회
export const getPreferenceList = async (): Promise<GetPreferenceListResponse> => {
  const response = await GetAxiosInstance<GetPreferenceListResponse>(`/members/stat/preference`);

  return response.data;
};

// 멤버 선호 항목 생성
export const createPreferenceList = async (
  data: CreatePreferenceListRequest,
): Promise<CreatePreferenceListResponse> => {
  const response = await PostAxiosInstance<CreatePreferenceListResponse>(
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
