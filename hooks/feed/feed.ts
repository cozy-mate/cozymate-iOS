import { useQuery } from '@tanstack/react-query';

import { queries } from '@/server';
import { useMemberStore } from '@/zustand/store';

export const useGetMyRoomFeed = () => {
  const { roomInfo } = useMemberStore();

  return useQuery({
    ...queries.feed.detail,
    enabled: roomInfo?.roomId !== undefined,
  });
};
