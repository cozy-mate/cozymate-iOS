import { GetAxiosInstance } from '@axios/axios.method';
import { ReissueTokenResponse } from '@server/responseTypes/auth';

// 토큰 재발행
export const reissueToken = async (refreshToken: string): Promise<ReissueTokenResponse> => {
  const response = await GetAxiosInstance<ReissueTokenResponse>(`/auth/reissue`, {
    headers: {
      Authorization: `Bearer ${refreshToken}`,
    },
  });

  return response.data;
};
