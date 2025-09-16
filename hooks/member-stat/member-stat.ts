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
  searchUser,
  updateMemberDetail,
} from '@/server/member-stat/member-stat';
import { CreateMemberDetailRequest, UpdatememberDetailRequest } from '@/server/member-stat/request';
import {
  useRegisterLifeStyleStore,
  useShowLifeStyleInputStore,
} from '@/zustand/member-stat/member-stat';
import { useMemberStore } from '@/zustand/store';

export const useGetMyDetail = () => {
  const { hasLifeStyle } = useMemberStore();

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
    // 오류가 발생했을 때 refetch를 시도하는 것 방지
    retry: false,
  });
};

// 사용자 랜덤 추천
export const useGetRandomMemberList = () => {
  const { hasLifeStyle } = useMemberStore();

  return useQuery({
    queryKey: [`/members/stat/random`],
    queryFn: () => getRandomMemberList(),
    enabled: !hasLifeStyle,
  });
};

// 사용자 상세정보 완전 일치 필터링 및 일치율 조회
export const useGetHomeMemberList = () => {
  const { hasLifeStyle } = useMemberStore();

  return useQuery({
    queryKey: [`/members/stat/filter/home`],
    queryFn: () => getMemberList(0),
    enabled: hasLifeStyle,
  });
};

export const useGetMemberList = (filterList: string[], hasRoom: boolean) => {
  const { hasLifeStyle } = useMemberStore();

  return useInfiniteQuery({
    queryKey: [`/members/stat/filter`, filterList, hasRoom],
    queryFn: ({ pageParam }) => getMemberList(pageParam, filterList, hasRoom),
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
  const queryClient = useQueryClient();

  const router = useRouter();

  const { memberInfo, setHasLifeStyle } = useMemberStore();
  const { clearLifeStyle } = useRegisterLifeStyleStore();
  const { clearShowLifeStyleInput } = useShowLifeStyleInputStore();

  return useMutation({
    mutationFn: (data: CreateMemberDetailRequest) => createMemberDetail(data),
    onSuccess: () => {
      setHasLifeStyle();
      clearLifeStyle();
      clearShowLifeStyleInput();

      queryClient.invalidateQueries({ queryKey: [`/members/stat`] });
      queryClient.invalidateQueries({ queryKey: [`/members/stat/suspense`] });
      queryClient.invalidateQueries({
        queryKey: [`/members/stat/${memberInfo?.memberId}`, memberInfo?.memberId],
      });

      queryClient.invalidateQueries({ queryKey: [`/members/stat/random`] });
      queryClient.invalidateQueries({ queryKey: [`/members/stat/filter/home`] });
      queryClient.invalidateQueries({ queryKey: [`/rooms/list/home`] });

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

  const { memberInfo } = useMemberStore();

  return useMutation({
    mutationFn: (data: UpdatememberDetailRequest) => updateMemberDetail(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`/members/stat`] });
      queryClient.invalidateQueries({ queryKey: [`/members/stat/suspense`] });
      queryClient.invalidateQueries({
        queryKey: [`/members/stat/${memberInfo?.memberId}`, memberInfo?.memberId],
      });

      queryClient.invalidateQueries({ queryKey: [`/members/stat/random`] });
      queryClient.invalidateQueries({ queryKey: [`/members/stat/filter/home`] });
      queryClient.invalidateQueries({ queryKey: [`/rooms/list/home`] });

      router.back();
    },
    onError: (error: any) => {
      console.log(error);
    },
  });
};

export const useSearchUser = (keyword: string) => {
  return useQuery({
    queryKey: [`/members/stat/search`, keyword],
    queryFn: () => searchUser(keyword),
    enabled: keyword !== '',
  });
};
