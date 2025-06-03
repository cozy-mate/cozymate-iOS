import { StackActions } from '@react-navigation/native';
import { useMutation, useQueryClient, useSuspenseQuery } from '@tanstack/react-query';
import { useNavigationContainerRef, useRouter } from 'expo-router';

import { useAuthProvider } from '@/providers/AuthProvider';
import {
  checkNickname,
  signUp,
  updateMemberInfo,
  getMemberProfile,
  withdraw,
  getMemberUniversityInfo,
} from '@/server/member/member';
import { SignUpRequest, UpdateMemberInfoRequest, WithdrawRequest } from '@/server/member/request';
import { SignUpResponse } from '@/server/member/response';
import { deleteToken, setAccessToken, setRefreshToken } from '@/utils/token';
import { useMailAuthenticationStore } from '@/zustand/mail/mail';
import { useMemberStore, useSignUpStore } from '@/zustand/member/member';
import { useHasLifeStyleStore, useRegisterLifeStyleStore } from '@/zustand/member-stat/member-stat';
import { useSelectedItemStore } from '@/zustand/roleNRule/roleNRule';
import { useHasRoomStore } from '@/zustand/room/room';

export const useWithdraw = () => {
  const router = useRouter();
  const rootNavigation = useNavigationContainerRef();

  const { clearMailState } = useMailAuthenticationStore();
  const { clearSignUpState } = useSignUpStore();
  const { clearMemberState } = useMemberStore();
  const { clearHasLifeStyle } = useHasLifeStyleStore();
  const { clearLifeStyle } = useRegisterLifeStyleStore();
  const { clearSelectedItem } = useSelectedItemStore();
  const { clearRoomInfo } = useHasRoomStore();

  return useMutation({
    mutationFn: (data?: WithdrawRequest) => withdraw(data),
    onSuccess: async () => {
      await deleteToken();

      clearMailState();
      clearSignUpState();
      clearMemberState();
      clearHasLifeStyle();
      clearLifeStyle();
      clearSelectedItem();
      clearRoomInfo();

      rootNavigation.dispatch(StackActions.popToTop());
      router.replace('/');
    },
  });
};

export const useGetMemberUniversityInfo = () => {
  return useSuspenseQuery({
    queryKey: [`/members/university-info`],
    queryFn: () => getMemberUniversityInfo(),
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
  const { broadcastLogin } = useAuthProvider();
  return useMutation({
    mutationFn: (data: SignUpRequest) => signUp(data),
    onSuccess: async (response: SignUpResponse) => {
      await Promise.all([
        setAccessToken(response.result.tokenResponseDTO.accessToken),
        setRefreshToken(response.result.tokenResponseDTO.refreshToken),
        setMemberState(response.result.memberDetailResponseDTO),
      ]).then(() =>
        // Auth 전역 상태 업데이트
        broadcastLogin(),
      );

      router.push('/(onBoard)/complete');
    },
  });
};
