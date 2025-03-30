import { PostAxiosInstance } from '@/axios/axios.method';

import { SendMailRequest, VerifyMailRequest } from './request';
import { VerifyMailResponse } from './response';

// 메일 인증 여부 반환

// 메일 인증
export const sendMail = async (data: SendMailRequest) => {
  const response = await PostAxiosInstance(`/members/mail`, data);

  return response.data;
};

// 메일 인증
export const verifyMail = async (data: VerifyMailRequest): Promise<VerifyMailResponse> => {
  const response = await PostAxiosInstance<VerifyMailResponse>(`/members/mail/verify`, data);

  return response.data;
};
