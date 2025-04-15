import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
  useSuspenseQuery,
} from '@tanstack/react-query';
import { useRouter } from 'expo-router';

import {
  createMemberDetail,
  getMemberDetail,
  getMemberList,
  getMyDetail,
  getRandomMemberList,
  updateMemberDetail,
} from '@/apis/member-stat/member-stat';
import { CreateMemberDetailRequest, UpdatememberDetailRequest } from '@/apis/member-stat/request';
import { useHasLifeStyleStore } from '@/zustand/member-stat/member-stat';

export const useGetMyDetail = () => {
  const { hasLifeStyle } = useHasLifeStyleStore();

  return useQuery({
    queryKey: [`/members/stat`],
    queryFn: () => getMyDetail(),
    enabled: hasLifeStyle,
  });
};

export const useSuspenseGetMyDetail = () => {
  return useSuspenseQuery({
    queryKey: [`/members/stat/suspense`],
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
      queryClient.invalidateQueries({ queryKey: [`/member/stat/suspense`] });
      router.back();
    },
    onError: (error: any) => {
      console.log(error);
    },
  });
};
