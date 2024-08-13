import { GuestGetAxiosInstance } from '@axios/guest.axios.method';
import { KakaoLoginResponse } from '@server/responseTypes/kakao';

export const kakaoLogin = async (): Promise<KakaoLoginResponse> => {
  const response = await GuestGetAxiosInstance<KakaoLoginResponse>(`/oauth2/kakao/sign-in`);

  console.log(response.data.result);
  return response.data.result;
};
