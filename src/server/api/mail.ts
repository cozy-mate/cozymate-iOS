import { PostAxiosInstance } from '@axios/axios.method';

import { VerifyMailResponse } from '@server/responseTypes/mail';
import { SendMailRequest, VerifyMailRequest } from '@server/requestTypes/mail';

// 메일 인증
export const verifyMail = async (data: VerifyMailRequest): Promise<VerifyMailResponse> => {
  const response = await PostAxiosInstance<VerifyMailResponse>(`/members/mail/verify`, data);

  return response.data;
};

// 메일 보내기
export const sendMail = async (data: SendMailRequest) => {
  const response = await PostAxiosInstance(`/members/mail`, data);

  return response.data;
};
