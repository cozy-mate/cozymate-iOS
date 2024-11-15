import { useSuspenseQuery, UseSuspenseQueryResult } from '@tanstack/react-query';

import { getUniversityList, getUserUniversity } from '@server/api/university';
import {
  GetUniversityListResponse,
  GetUserUniversityResponse,
} from '@server/responseTypes/university';

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

export const useGetUserUniversity = (): UseSuspenseQueryResult<GetUserUniversityResponse> => {
  return useSuspenseQuery({
    queryKey: [`/university/get-member-univ-info`],
    queryFn: () => getUserUniversity(),
  });
};
