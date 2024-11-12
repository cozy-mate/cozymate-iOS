import { useSuspenseQuery } from '@tanstack/react-query';

import { getUniversityList } from '@server/api/university';
import { GetUniversityListResponse } from '@server/responseTypes/university';

export const useGetUniversityList = (): {
  data: GetUniversityListResponse;
  refetch: () => void;
} => {
  const { data, refetch } = useSuspenseQuery({
    queryKey: ['universityList'],
    queryFn: () => getUniversityList(),
    select: (response: GetUniversityListResponse) => {
      return response;
    },
  });

  return { data, refetch };
};
