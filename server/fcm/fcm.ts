import { PostAxiosInstance } from '@/axios/axios.method';

import { FcmRequestType } from './request';
import { FcmResponseType } from './response';

// fcm토큰, 기기 고유 값 저장
export const postFcmToken = async (data: FcmRequestType): Promise<FcmResponseType> => {
  const response = await PostAxiosInstance<FcmResponseType>('/fcm', data);
  return response.data;
};
