import { GuestGetAxiosInstance, GuestPostAxiosInstance } from '@/axios/guest.axios.method';

import { SocialLoginRequest } from './request';
import { ReissueTokenResponse, SocialLoginResponse } from './response';

// 토큰 재발행
export const reissueToken = async (refreshToken: string): Promise<ReissueTokenResponse> => {
  const response = await GuestGetAxiosInstance<ReissueTokenResponse>(`/auth/reissue`, {
    headers: {
      Authorization: `Bearer ${refreshToken}`,
    },
  });

  return response.data;
};

// 로그인
export const socialLogin = async (data: SocialLoginRequest): Promise<SocialLoginResponse> => {
  const response = await GuestPostAxiosInstance<SocialLoginResponse>(`/auth/sign-in`, data);

  return response.data;
};
