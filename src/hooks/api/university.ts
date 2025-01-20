import { useSuspenseQuery, UseSuspenseQueryResult } from '@tanstack/react-query';

import { getUniversityData, getUniversityList, getUserUniversity } from '@server/api/university';
import {
  GetUniversityDataResponse,
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

export const useGetUniversityInfo = (
  universityId: number,
): UseSuspenseQueryResult<GetUniversityDataResponse> => {
  return useSuspenseQuery({
    queryKey: [`/university/get-info`],
    queryFn: () => getUniversityData(universityId),
  });
};
