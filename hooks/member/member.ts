import { StackActions } from '@react-navigation/native';
import { useMutation, useQueryClient, useSuspenseQuery } from '@tanstack/react-query';
import { useNavigationContainerRef, useRouter } from 'expo-router';

import {
  checkNickname,
  signUp,
  updateMemberInfo,
  getMemberProfile,
  withdraw,
} from '@/apis/member/member';
import { SignUpRequest, UpdateMemberInfoRequest, WithdrawRequest } from '@/apis/member/request';
import { SignUpResponse } from '@/apis/member/response';
import { deleteToken, setAccessToken, setRefreshToken } from '@/utils/token';
import { useMemberStore } from '@/zustand/member/member';

export const useWithdraw = () => {
  const router = useRouter();
  const rootNavigation = useNavigationContainerRef();

  return useMutation({
    mutationFn: (data?: WithdrawRequest) => withdraw(data),
    onSuccess: async () => {
      await deleteToken();

      rootNavigation.dispatch(StackActions.popToTop());
      router.replace('/');
    },
  });
};

export const useCheckNickname = () => {
  return useMutation({
    mutationFn: (nickname: string) => checkNickname(nickname),
    onSuccess: () => {
      console.log('닉네임 확인 성공');
    },
  });
};

export const useGetMemberProfile = () => {
  return useSuspenseQuery({
    queryKey: [`/members/member-info`],
    queryFn: () => getMemberProfile(),
  });
};

export const useUpdateMemberInfo = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateMemberInfoRequest) => updateMemberInfo(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`/members/member-info`] });
      router.back();
    },
  });
};

export const useSignUp = () => {
  const router = useRouter();

  const { setMemberState } = useMemberStore();

  return useMutation({
    mutationFn: (data: SignUpRequest) => signUp(data),
    onSuccess: async (response: SignUpResponse) => {
      await Promise.all([
        setAccessToken(response.result.tokenResponseDTO.accessToken),
        setRefreshToken(response.result.tokenResponseDTO.refreshToken),
        setMemberState(response.result.memberDetailResponseDTO),
      ]);

      router.push('/(onBoard)/complete');
    },
  });
};
