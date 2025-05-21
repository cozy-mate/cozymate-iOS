import { GetAxiosInstance } from '@/axios/axios.method';

import { GetRoomMemberStatsResponse } from './response';

// 방에 속해 있는 메이트 멤버 상세정보 조회
export const getRoomMemberStats = async (
  roomId: number,
  memberStatKey: string,
): Promise<GetRoomMemberStatsResponse> => {
  const resposne = await GetAxiosInstance<GetRoomMemberStatsResponse>(
    `/rooms/${roomId}/memberStat/${memberStatKey}`,
  );

  return resposne.data;
};
