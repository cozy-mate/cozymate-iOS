import { PostAxiosInstance } from '@axios/axios.method';
import { FcmRequestType } from '@server/requestTypes/fcm';
import { FcmResponseType } from '@server/responseTypes/fcm';

export const postFcmToken = async (data: FcmRequestType): Promise<FcmResponseType> => {
  const response = await PostAxiosInstance<FcmResponseType>('/fcm', data);
  return response.data;
};
