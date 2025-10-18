import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
  useSuspenseQuery,
} from '@tanstack/react-query';
import { useRouter } from 'expo-router';

import { matchMultiQueries, queries } from '@/server';
import { createMemberDetail, updateMemberDetail } from '@/server/member-stat/member-stat';
import { CreateMemberDetailRequest, UpdatememberDetailRequest } from '@/server/member-stat/request';
import { GetMemberListResponse } from '@/server/member-stat/response';
import {
  useRegisterLifeStyleStore,
  useShowLifeStyleInputStore,
} from '@/zustand/member-stat/member-stat';
import { useMemberStore } from '@/zustand/store';

export const useGetMyDetail = () => {
  const { hasLifeStyle } = useMemberStore();

  return useQuery({
    ...queries.memberStat.myDetail(),
    enabled: hasLifeStyle,
  });
};

export const useSuspenseGetMyDetail = () => {
  return useSuspenseQuery(queries.memberStat.suspenseMyDetail());
};

// 사용자 상세정보 조회
export const useGetMemberDetail = (memberId: number) => {
  return useQuery({
    ...queries.memberStat.detail({ memberId }),
    // 오류가 발생했을 때 refetch를 시도하는 것 방지
    retry: false,
  });
};

// 사용자 랜덤 추천
export const useGetRandomMemberList = () => {
  const { hasLifeStyle } = useMemberStore();

  return useQuery({
    ...queries.memberStat.randomList(),
    enabled: !hasLifeStyle,
  });
};

// 사용자 상세정보 완전 일치 필터링 및 일치율 조회
export const useGetHomeMemberList = () => {
  const { hasLifeStyle } = useMemberStore();
  ///members/stat/filter/home
  return useQuery({
    ...queries.memberStat.filterHome(),
    enabled: hasLifeStyle,
  });
};

export const useGetMemberList = (filterList: string[], hasRoom: boolean) => {
  const { hasLifeStyle } = useMemberStore();

  return useInfiniteQuery({
    ...queries.memberStat.list({ filterList, hasRoom }),
    initialPageParam: 0,
    getNextPageParam: (lastPage: GetMemberListResponse) => {
      if (lastPage.result.hasNext) {
        return lastPage.result.page + 1;
      }
    },
    enabled: hasLifeStyle,
  });
};

export const useCreateMemberDetail = () => {
  const queryClient = useQueryClient();

  const router = useRouter();

  const { setHasLifeStyle } = useMemberStore();
  const { clearLifeStyle } = useRegisterLifeStyleStore();
  const { clearShowLifeStyleInput } = useShowLifeStyleInputStore();

  return useMutation({
    mutationFn: (data: CreateMemberDetailRequest) => createMemberDetail(data),
    onSuccess: () => {
      setHasLifeStyle();
      clearLifeStyle();
      clearShowLifeStyleInput();

      queryClient.invalidateQueries({
        predicate: matchMultiQueries([queries.memberStat._def, ['/rooms/list/home']]),
      });

      router.dismissAll();
      router.back();
    },
    onError: (error: any) => {
      console.log(error);
      console.log(error.response?.data?.message);
    },
  });
};

export const useUpdateMemberDetail = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdatememberDetailRequest) => updateMemberDetail(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        predicate: matchMultiQueries([queries.memberStat._def, ['/rooms/list/home']]),
      });

      router.back();
    },
    onError: (error: any) => {
      console.log(error);
    },
  });
};

export const useSearchUser = (keyword: string) => {
  return useQuery({
    ...queries.memberStat.searchUser({ keyword }),
    enabled: keyword !== '',
  });
};
