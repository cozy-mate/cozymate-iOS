import { getFeedData } from '@server/api/feed';
import { useQuery } from '@tanstack/react-query';

export const useGetFeedInfo = (roomId: number) => {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['feedInfo', roomId],
    queryFn: () => getFeedData(roomId),
    select: (data) => {
      return {
        name: data.result.name,
        description: data.result.description,
        isEnabled: data.result.name !== '' && data.result.description !== '',
      };
    },
  });
  return { data, isLoading, isError, refetch };
};
