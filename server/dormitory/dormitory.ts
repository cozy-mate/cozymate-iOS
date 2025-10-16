import { GetAxiosInstance } from '@/axios/axios.method';

import { GetDormitoryMenuRequest, GetDormitoryNoticeRequest } from './request';
import {
  GetDormitoryMenuResponse,
  GetDormitoryNoticeResponse,
  GetDormitoryNoticePreviewResponse,
} from './response';

export const getDormitoryMenu = async ({
  date,
}: GetDormitoryMenuRequest): Promise<GetDormitoryMenuResponse> => {
  const response = await GetAxiosInstance<GetDormitoryMenuResponse>(`/dormitory/menu/${date}`);
  return response.data;
};

export const getDormitoryNotice = async ({
  page,
  size,
  isImportant,
}: GetDormitoryNoticeRequest): Promise<GetDormitoryNoticeResponse> => {
  const response = await GetAxiosInstance<GetDormitoryNoticeResponse>(`/dormitory/notice`, {
    params: {
      page,
      size,
      isImportant,
    },
  });
  return response.data;
};

export const getDormitoryNoticePreview = async (): Promise<GetDormitoryNoticePreviewResponse> => {
  const response =
    await GetAxiosInstance<GetDormitoryNoticePreviewResponse>(`/dormitory/notice/preview`);
  return response.data;
};
