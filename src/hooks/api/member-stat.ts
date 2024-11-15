import { useQuery, useSuspenseQuery, useSuspenseInfiniteQuery } from '@tanstack/react-query';

import { useHasLifeStyleStore } from '@zustand/member-stat/member-stat';

import { searchMembers, getRandomMember, getOtherMemberStatData } from '@server/api/member-stat';
import {
  SearchMembersResponse,
  GetRandomMemberResponse,
  GetMemberStatDataResponse,
} from '@server/responseTypes/member-stat';

// 사용자 상세정보 조회
export const useGetMemberStatData = (
  memberId: number,
): {
  data: GetMemberStatDataResponse;
  refetch: () => void;
} => {
  const { data, refetch } = useSuspenseQuery({
    queryKey: ['otherlifestyledata', memberId],
    queryFn: () => getOtherMemberStatData(memberId),
    select: (response: GetMemberStatDataResponse) => {
      return response;
    },
  });

  return { data, refetch };
};

// 사용자 랜덤 추천
export const useGetRandomMember = (): {
  data: GetRandomMemberResponse;
  refetch: () => void;
} => {
  const { data, refetch } = useSuspenseQuery({
    queryKey: ['randomMemberList'],
    queryFn: () => getRandomMember(),
    select: (reseponse: GetRandomMemberResponse) => {
      return reseponse;
    },
  });

  return { data, refetch };
};

// 사용자 상세정보 필터링 완전 일치 필터링 및 일치율 조회
export const useSearchMembersByFilter = (
  page?: number,
  filterList?: string[],
): { data: SearchMembersResponse | undefined; refetch: () => void } => {
  const { hasLifeStyle } = useHasLifeStyleStore();

  const { data, refetch } = useQuery({
    queryKey: ['sameanswerdata', page, filterList],
    queryFn: () => searchMembers(page, filterList),
    select: (response: SearchMembersResponse) => {
      return response;
    },
    enabled: hasLifeStyle,
  });

  return { data, refetch };
};

// 사용자 상세정보 필터링 완전 일치 필터링 및 일치율 조회
export const useSearchMembers = (): {
  data: SearchMembersResponse | undefined;
  refetch: () => void;
} => {
  const { hasLifeStyle } = useHasLifeStyleStore();

  const { data, refetch } = useQuery({
    queryKey: ['similarmatedata'],
    queryFn: () => searchMembers(),
    select: (response: SearchMembersResponse) => {
      return response;
    },
    enabled: hasLifeStyle,
  });

  return { data, refetch };
};

export const useGetMemberList = (): {
  data: GetRandomMemberResponse | SearchMembersResponse;
  refetch: () => void;
} => {
  const { hasLifeStyle } = useHasLifeStyleStore();

  const { data, refetch } = useSuspenseQuery({
    queryKey: ['memberlistdata'],
    queryFn: () => (hasLifeStyle ? searchMembers() : getRandomMember()),
    select: (response: GetRandomMemberResponse | SearchMembersResponse) => {
      return response;
    },
  });

  return { data, refetch };
};

export const useGetMember = () => {
  const { data, fetchNextPage, hasNextPage } = useSuspenseInfiniteQuery({
    queryKey: ['memberdata'],
    queryFn: ({ pageParam = 0 }) => searchMembers(pageParam),
    getNextPageParam: (lastPage) => {
      return lastPage.result.hasNext ? lastPage.result.page + 1 : undefined;
    },
    select: (data) => {
      return data;
    },
    initialPageParam: 0,
  });

  return { data, fetchNextPage, hasNextPage };
};
