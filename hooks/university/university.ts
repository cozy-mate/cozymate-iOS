import { useQuery, useSuspenseQuery } from '@tanstack/react-query';

import { getMyUniversityInfo, getUniversityInfo } from '@/server/university/university';
import { queries } from '../../server/index';

export const useGetMyUniversityInfo = () => {
  return useSuspenseQuery({
    ...queries.university.myUniversity(),
  });
};

export const useGetUniversityInfo = (universityId: number) => {
  return useQuery({
    ...queries.university.detail({ universityId }),
    enabled: universityId !== 0,
  });
};
