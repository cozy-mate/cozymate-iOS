import { useMutation } from '@tanstack/react-query';

import { getRoomMemberStats } from '@/apis/room-member-stat/room-member-stat';

export const useGetRoomMemberStats = () => {
  return useMutation({
    mutationFn: ({ roomId, memberStatKey }: { roomId: number; memberStatKey: string }) =>
      getRoomMemberStats(roomId, memberStatKey),
  });
};
