import {
  useQuery,
  useMutation,
  UseQueryResult,
  useSuspenseQuery,
  useInfiniteQuery,
  useSuspenseInfiniteQuery,
} from '@tanstack/react-query';

import { useHasLifeStyleStore, useDetailFilterListStore } from '@zustand/member-stat/member-stat';

import {
  SearchMembersResponse,
  // GetRandomMemberResponse,
  SearchMemberByKeywordResponse,
  GetOtherMemberStatDataResponse,
} from '@server/responseTypes/member-stat';
import {
  UpdateMemberStatRequest,
  RegisterMemberStatRequest,
  GetFilteredMemberListRequest,
  GetFilteredMemberListCountRequest,
} from '@server/requestTypes/member-stat';
import {
  searchMembers,
  // getRandomMember,
  updateMemberStat,
  registerMemberStat,
  searchMemberByKeyword,
  getFilteredMemberList,
  getOtherMemberStatData,
  getFilteredMemberListCount,
} from '@server/api/member-stat';

// 사용자 상세정보 조회
export const useGetMemberStatData = (
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
// export const useGetRandomMember = (): {
//   data: GetRandomMemberResponse | undefined;
//   refetch: () => void;
// } => {
//   const { hasLifeStyle } = useHasLifeStyleStore();

//   const { data, refetch } = useQuery({
//     queryKey: ['randomMemberList'],
//     queryFn: () => getRandomMember(),
//     select: (reseponse: GetRandomMemberResponse) => {
//       return reseponse;
//     },
//     enabled: !hasLifeStyle,
//   });

//   return { data, refetch };
// };

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
  const { data, refetch } = useSuspenseQuery({
    queryKey: [`/members/stat/filter`],
    queryFn: () => searchMembers(),
    select: (response: SearchMembersResponse) => {
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

export const useGetFilteredMemberList = (data: GetFilteredMemberListRequest) => {
  return useInfiniteQuery({
    queryKey: [`/members/stat/filter/search`],
    queryFn: async ({ pageParam }) => {
      const response = await getFilteredMemberList(data, pageParam);
      console.log(response);
      return response;
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      if (lastPage.result.hasNext) {
        return lastPage.result.page + 1;
      }
    },
  });
};

export const useFilter = (chipData: string[], filterData: GetFilteredMemberListRequest) => {
  const { initialValue, detailFilterList } = useDetailFilterListStore();

  return useInfiniteQuery({
    queryKey: ['filteringData', chipData, detailFilterList],
    queryFn: async ({ pageParam }) => {
      if (JSON.stringify(detailFilterList) === JSON.stringify(initialValue)) {
        const response = await searchMembers(pageParam, chipData);
        console.log('칩 기반 출력', response);
        return response;
      } else {
        const response = await getFilteredMemberList(filterData, pageParam);
        console.log('필터 기반 출력', response);
        return response;
      }
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      if (lastPage.result.hasNext) {
        return lastPage.result.page + 1;
      }
    },
  });
};

export const useGetFilteredMemberListCount = (data: GetFilteredMemberListCountRequest) => {
  return useQuery({
    queryKey: [`/members/stat/filter/search/count`, data],
    queryFn: () => getFilteredMemberListCount(data),
  });
};

export const useRegisterLifeStyle = () => {
  return useMutation({
    mutationFn: (data: RegisterMemberStatRequest) => registerMemberStat(data),
  });
};

export const useUpdateMemberStat = () => {
  return useMutation({
    mutationFn: (data: UpdateMemberStatRequest) => updateMemberStat(data),
  });
};
