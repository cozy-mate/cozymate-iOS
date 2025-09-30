import { createQueryKeys } from '@lukemorales/query-key-factory';
import { getRoomMemberStats } from './room-member-stat';

export const roomMemberStatQueries = createQueryKeys('roomMemberStat', {
  getRoomMemberStatList: ({
    roomId,
    memberStatKey,
  }: {
    roomId: number;
    memberStatKey: string;
  }) => ({
    queryKey: ['list', roomId, memberStatKey],
    queryFn: () => getRoomMemberStats(roomId, memberStatKey),
  }),
});
