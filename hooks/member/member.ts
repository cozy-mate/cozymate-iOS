import { useMutation, useQueryClient, useSuspenseQuery } from '@tanstack/react-query';
import { useRouter } from 'expo-router';

import { checkNickname, signUp, updateMemberInfo, getMemberProfile } from '@/apis/member/member';
import { SignUpRequest, UpdateMemberInfoRequest } from '@/apis/member/request';
import { SignUpResponse } from '@/apis/member/response';
import { createPreferenceList } from '@/apis/member-stat-preference/member-stat-preference';
import { setAccessToken, setRefreshToken } from '@/utils/token';
import { useMemberStore } from '@/zustand/member/member';

export const useCheckNickname = () => {
  return useMutation({
    mutationFn: (nickname: string) => checkNickname(nickname),
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

export const useSignUp = (preferenceList: string[], closeTermModal: () => void) => {
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

      await createPreferenceList({ preferenceList });

      closeTermModal();
      router.push('/onBoard/complete');
    },
  });
};
