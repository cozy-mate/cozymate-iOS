import { useQuery, useSuspenseQuery } from '@tanstack/react-query';

import { useHasLifeStyleStore } from '@zustand/member-stat/member-stat';

import {
  searchMembers,
  getRandomMember,
  getMemberStatData,
  getOtherMemberStatData,
} from '@server/api/member-stat';
import {
  SearchMembersResponse,
  GetRandomMemberResponse,
  GetMemberStatDataResponse,
  GetOtherMemberStatDataResponse,
} from '@server/responseTypes/member-stat';

// 사용자 상세정보 조회
export const useGetMemberStatData = (): {
  data: GetMemberStatDataResponse;
  refetch: () => void;
} => {
  const { data, refetch } = useSuspenseQuery({
    queryKey: ['mylifestyledata'],
    queryFn: () => getMemberStatData(),
    select: (reseponse: GetMemberStatDataResponse) => {
      return reseponse;
    },
  });

  return { data, refetch };
};

// 사용자 상세정보 조회 (타인용)
export const useGetOtherMemberStatData = (
  memberId: number,
): {
  data: GetOtherMemberStatDataResponse;
  refetch: () => void;
} => {
  const { data, refetch } = useSuspenseQuery({
    queryKey: ['otherlifestyledata', memberId],
    queryFn: () => getOtherMemberStatData(memberId),
    select: (response: GetOtherMemberStatDataResponse) => {
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
