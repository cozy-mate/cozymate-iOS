import { GetAxiosInstance, PostAxiosInstance } from '@axios/axios.method';

import { SendMailRequest, VerifyMailRequest } from '@server/requestTypes/mail';
import { VerifyMailResponse, CheckVerifiedResponse } from '@server/responseTypes/mail';

// 메일 인증 여부 반환
export const checkVerified = async (): Promise<CheckVerifiedResponse> => {
  const response = await GetAxiosInstance<CheckVerifiedResponse>(`/members/mail/verify`);

  return response.data;
};

// 메일 보내기
export const sendMail = async (data: SendMailRequest) => {
  const response = await PostAxiosInstance(`/members/mail`, data);

  return response.data;
};

// 메일 인증
export const verifyMail = async (data: VerifyMailRequest): Promise<VerifyMailResponse> => {
  const response = await PostAxiosInstance<VerifyMailResponse>(`/members/mail/verify`, data);

  return response.data;
};
