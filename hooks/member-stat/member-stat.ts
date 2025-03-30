import { useInfiniteQuery, useMutation, useQuery, useSuspenseQuery } from '@tanstack/react-query';
import { useRouter } from 'expo-router';

import {
  createMemberDetail,
  getMemberDetail,
  getMemberList,
  getMyDetail,
  getRandomMemberList,
} from '@/apis/member-stat/member-stat';
import { CreateMemberDetailRequest } from '@/apis/member-stat/request';
import { useHasLifeStyleStore } from '@/zustand/member-stat/member-stat';

export const useGetMyDetail = () => {
  return useSuspenseQuery({
    queryKey: [`/members/stat`],
    queryFn: () => getMyDetail(),
  });
};

// 사용자 상세정보 조회
export const useGetMemberDetail = (memberId: number) => {
  return useSuspenseQuery({
    queryKey: [`/members/stat/${memberId}`, memberId],
    queryFn: () => getMemberDetail(memberId),
  });
};

// 사용자 랜덤 추천
export const useGetRandomMemberList = () => {
  const { hasLifeStyle } = useHasLifeStyleStore();

  return useQuery({
    queryKey: [`/members/stat/random`],
    queryFn: () => getRandomMemberList(),
    enabled: !hasLifeStyle,
  });
};

// 사용자 상세정보 완전 일치 필터링 및 일치율 조회
export const useGetHomeMemberList = () => {
  const { hasLifeStyle } = useHasLifeStyleStore();

  return useQuery({
    queryKey: [`/members/stat/filter/home`],
    queryFn: () => getMemberList(0),
    enabled: hasLifeStyle,
  });
};

export const useGetMemberList = (filterList: string[]) => {
  const { hasLifeStyle } = useHasLifeStyleStore();

  return useInfiniteQuery({
    queryKey: [`/members/stat/filter`, filterList],
    queryFn: () => getMemberList(0, filterList),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      if (lastPage.result.hasNext) {
        return lastPage.result.page + 1;
      }
    },
    enabled: hasLifeStyle,
  });
};

export const useCreateMemberDetail = () => {
  const router = useRouter();

  const { setHasLifeStyle } = useHasLifeStyleStore();

  return useMutation({
    mutationFn: (data: CreateMemberDetailRequest) => createMemberDetail(data),
    onSuccess: () => {
      setHasLifeStyle(true);
      router.dismiss(5);
    },
    onError: (error: any) => {
      console.log(error);
    },
  });
};
