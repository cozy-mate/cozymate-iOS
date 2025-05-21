import { useQuery, useSuspenseQuery } from '@tanstack/react-query';

import { getMyUniversityInfo, getUniversityInfo } from '@/server/university/university';

export const useGetMyUniversityInfo = () => {
  return useSuspenseQuery({
    queryKey: [`/university/get-member-univ-info`],
    queryFn: () => getMyUniversityInfo(),
  });
};

export const useGetUniversityInfo = (universityId: number) => {
  return useQuery({
    queryKey: [`/university/get-info`, universityId],
    queryFn: () => getUniversityInfo(universityId),
    enabled: universityId !== 0,
  });
};
