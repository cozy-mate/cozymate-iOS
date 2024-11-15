import { GetAxiosInstance } from '@axios/axios.method';

import { GetChipDetailDataResponse } from '@server/responseTypes/room-member-stat';

// 방에 속해 있는 메이트 멤버 상세정보 조회
export const getChipDetailData = async (
  roomId: number,
  memberStatKey: string,
): Promise<GetChipDetailDataResponse> => {
  const response = await GetAxiosInstance<GetChipDetailDataResponse>(
    `/rooms/${roomId}/memberStat/${memberStatKey}`,
  );

  return response.data;
};
