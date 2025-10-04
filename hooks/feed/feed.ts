import { useQuery } from '@tanstack/react-query';

import { queries } from '@/server';

export const useGetMyRoomFeed = () => {
  return useQuery(queries.feed.detail);
};
