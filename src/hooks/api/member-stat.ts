import { useQuery, useSuspenseQuery } from '@tanstack/react-query';

import { useHasLifeStyleStore } from '@zustand/member-stat/member-stat';

import { searchUsers, getUserDetailData } from '@server/api/member-stat';
import { SearchUsersResponse, GetUserDetailDataResponse } from '@server/responseTypes/member-stat';

// 내 라이프 스타일 조회
export const useGetUserDetailData = (): {
  data: GetUserDetailDataResponse;
  refetch: () => void;
} => {
  const { data, refetch } = useSuspenseQuery({
    queryKey: ['mylifestyledata'],
    queryFn: () => getUserDetailData(),
    select: (reseponse: GetUserDetailDataResponse) => {
      return reseponse;
    },
  });

  return { data, refetch };
};

// 사용자 상세정보 필터링, 일치율 조회
export const useSearchUsersWithFilters = (
  filterList?: string[],
  page?: number,
): { data: SearchUsersResponse | undefined; refetch: () => void } => {
  const { hasLifeStyle } = useHasLifeStyleStore();

  const { data, refetch } = useQuery({
    queryKey: ['sameanswerdata', filterList, page],
    queryFn: () => searchUsers(filterList, page),
    select: (response: SearchUsersResponse) => {
      return response;
    },
    enabled: hasLifeStyle,
  });

  return { data, refetch };
};

// 비슷한 라이프 스타일 코지메이트 조회
export const useSearchUsers = (): {
  data: SearchUsersResponse | undefined;
  refetch: () => void;
} => {
  const { hasLifeStyle } = useHasLifeStyleStore();

  const { data, refetch } = useQuery({
    queryKey: ['similarmatedata'],
    queryFn: () => searchUsers(),
    select: (response: SearchUsersResponse) => {
      return response;
    },
    enabled: hasLifeStyle,
  });

  return { data, refetch };
};
