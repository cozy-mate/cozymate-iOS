import { useSuspenseQuery } from '@tanstack/react-query';

import { getMyUniversityInfo } from '@/apis/university/university';

export const useGetMyUniversityInfo = () => {
  return useSuspenseQuery({
    queryKey: [`/university/get-member-univ-info`],
    queryFn: () => getMyUniversityInfo(),
  });
};
