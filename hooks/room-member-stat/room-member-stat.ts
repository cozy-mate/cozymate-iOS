import { useMutation } from '@tanstack/react-query';

import { getRoomMemberStats } from '@/server/room-member-stat/room-member-stat';

export const useGetRoomMemberStats = () => {
  return useMutation({
    mutationFn: ({ roomId, memberStatKey }: { roomId: number; memberStatKey: string }) =>
      getRoomMemberStats(roomId, memberStatKey),
  });
};
