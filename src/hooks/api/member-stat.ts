import {
  useQuery,
  useMutation,
  UseQueryResult,
  useSuspenseQuery,
  useInfiniteQuery,
  useSuspenseInfiniteQuery,
} from '@tanstack/react-query';

import { useHasLifeStyleStore } from '@zustand/member-stat/member-stat';

import { GetFilteredMemberListCountRequest } from '@server/requestTypes/member-stat';
import {
  searchMembers,
  getRandomMember,
  searchMemberByKeyword,
  getOtherMemberStatData,
  getFilteredMemberListCount,
} from '@server/api/member-stat';
import {
  SearchMembersResponse,
  GetRandomMemberResponse,
  GetMemberStatDataResponse,
  SearchMemberByKeywordResponse,
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
// export const useSearchMembers = (): {
//   data: SearchMembersResponse | undefined;
//   refetch: () => void;
// } => {
//   const { hasLifeStyle } = useHasLifeStyleStore();

//   const { data, refetch } = useQuery({
//     queryKey: ['similarmatedata'],
//     queryFn: () => searchMembers(),
//     select: (response: SearchMembersResponse) => {
//       return response;
//     },
//     enabled: hasLifeStyle,
//   });

//   return { data, refetch };
// };

export const useGetMemberList = () => {
  const { hasLifeStyle } = useHasLifeStyleStore();

  const { data } = useSuspenseQuery({
    queryKey: ['/members/stat/random'],
    queryFn: () => (hasLifeStyle ? searchMembers() : getRandomMember()),
    select: (response: GetRandomMemberResponse | SearchMembersResponse) => {
      return response;
    },
  });

  return { data };
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

// 사용자 닉네임 검색
export const useSearchMemberByKeyword = (
  keyword: string,
): UseQueryResult<SearchMemberByKeywordResponse, unknown> => {
  return useQuery({
    queryKey: [`/members/stat/search`, keyword],
    queryFn: () => searchMemberByKeyword(keyword),
    enabled: keyword !== '',
  });
};

// 칩 기반 필터링
export const useSearchMembers = (filter: string[]) => {
  const { hasLifeStyle } = useHasLifeStyleStore();

  return useInfiniteQuery({
    queryKey: [`/members/stat/filter`, filter],
    queryFn: async ({ pageParam }) => {
      const response = await searchMembers(pageParam, filter);
      console.log(response); // 응답 데이터를 확인하여 구조가 올바른지 확인
      return response;
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      if (lastPage.result.hasNext) {
        return lastPage.result.page + 1;
      }
    },
    enabled: hasLifeStyle,
  });
};

export const useGetFilteredMemberListCount = () => {
  return useMutation({
    mutationFn: (data: GetFilteredMemberListCountRequest) => getFilteredMemberListCount(data),
  });
};
