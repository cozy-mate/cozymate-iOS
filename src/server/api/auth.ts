import { GuestGetAxiosInstance } from '@axios/guest.axios.method';

import { ReissueTokenResponse } from '@server/responseTypes/auth';

// 토큰 재발행
export const reissueToken = async (): Promise<ReissueTokenResponse> => {
  const response = await GuestGetAxiosInstance<ReissueTokenResponse>(`/auth/reissue`);

  return response.data;
};
