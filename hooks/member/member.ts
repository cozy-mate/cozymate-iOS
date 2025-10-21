import { useMutation, useQueryClient, useSuspenseQuery } from '@tanstack/react-query';
import { useRouter } from 'expo-router';

import { matchMultiQueries, queries } from '@/server';
import { checkNickname, signUp, updateMemberInfo, withdraw } from '@/server/member/member';
import { SignUpRequest, UpdateMemberInfoRequest, WithdrawRequest } from '@/server/member/request';
import { SignUpResponse } from '@/server/member/response';
import { showRejectToast } from '@/utils/toast';
import { deleteToken, setAccessToken, setRefreshToken } from '@/utils/token';
import { useMailAuthenticationStore } from '@/zustand/mail/mail';
import { useSignUpStore } from '@/zustand/member/member';
import { useRegisterLifeStyleStore } from '@/zustand/member-stat/member-stat';
import { useSelectedItemStore } from '@/zustand/roleNRule/roleNRule';
import { useCreateRoomStore } from '@/zustand/room/room';
import { useMemberStore } from '@/zustand/store';

export const useWithdraw = () => {
  const { clearMailState } = useMailAuthenticationStore();
  const { clearSignUpState } = useSignUpStore();
  const { logout } = useMemberStore();
  const { clearLifeStyle } = useRegisterLifeStyleStore();
  const { clearSelectedItem } = useSelectedItemStore();
  const { clearCreateRoomInfo } = useCreateRoomStore();

  return useMutation({
    mutationFn: (data?: WithdrawRequest) => withdraw(data),
    onSuccess: async () => {
      await deleteToken();

      logout();
      clearMailState();
      clearSignUpState();
      clearLifeStyle();
      clearSelectedItem();
      clearCreateRoomInfo();
    },
  });
};

export const useGetMemberUniversityInfo = () => {
  return useSuspenseQuery(queries.member.universityInfo());
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
  return useSuspenseQuery(queries.member.profile());
};

export const useUpdateMemberInfo = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { memberInfo, setMemberInfo, hasLifeStyle } = useMemberStore();

  return useMutation({
    mutationFn: (data: UpdateMemberInfoRequest) => updateMemberInfo(data),
    onSuccess: (_data, variables) => {
      const value = variables;
      setMemberInfo({
        ...memberInfo,
        ...value, // 새 값 덮어쓰기
        // memberId, gender, universityName, universityId는 기존 값을 유지하고 싶다면 명시적으로
        memberId: memberInfo?.memberId ?? 0,
        gender: memberInfo?.gender ?? '',
        universityName: memberInfo?.universityName ?? '',
        universityId: memberInfo?.universityId ?? 0,
      });

      queryClient.invalidateQueries({
        predicate: matchMultiQueries([queries.member.profile._def, queries.memberStat.list._def]),
      });

      if (hasLifeStyle) {
        queryClient.invalidateQueries(queries.memberStat.suspenseMyDetail());

        const memberId = memberInfo?.memberId;
        if (memberId) {
          queryClient.invalidateQueries(queries.memberStat.detail({ memberId }));
        }
        router.back();
      }
    },
    onError: () => {
      showRejectToast('내 정보 수정에 실패했어요!');
    },
  });
};

export const useSignUp = () => {
  const { setMemberInfo } = useMemberStore();

  return useMutation({
    mutationFn: (data: SignUpRequest) => signUp(data),
    onSuccess: async (response: SignUpResponse) => {
      await setAccessToken(response.result.tokenResponseDTO.accessToken);
      await setRefreshToken(response.result.tokenResponseDTO.refreshToken);

      setMemberInfo(response.result.memberDetailResponseDTO);
    },
  });
};
