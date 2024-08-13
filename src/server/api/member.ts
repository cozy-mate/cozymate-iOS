import { GuestGetAxiosInstance, GuestPostAxiosInstance } from '@axios/guest.axios.method';
import { GetAxiosInstance, DeleteAxiosInstance } from '@axios/axios.method';

import { SignInRequest, SignUpRequest } from '@server/requestTypes/member';
import {
  DeleteMemberResponse,
  GetProfileResponse,
  ReissueTokenResponse,
  SignInResponse,
  SignUpResponse,
} from '@server/responseTypes/member';

// 회원 탈퇴
export const deleteMember = async (): Promise<DeleteMemberResponse> => {
  const response = await DeleteAxiosInstance<DeleteMemberResponse>(`/api/v3/member/withdraw`);

  return response.data;
};

// 로그아웃
export const logout = async () => {
  const response = await GetAxiosInstance(`/api/v3/member/sign-out`);

  return response.data;
};

// 토큰 재발행
export const reissueToken = async (refreshToken: string): Promise<ReissueTokenResponse> => {
  const response = await GetAxiosInstance<ReissueTokenResponse>(`/api/v3/member/reissue`, {
    headers: {
      Authorization: `Bearer ${refreshToken}`,
    },
  });

  return response.data;
};

// 사용자 정보 조회
export const getProfile = async (): Promise<GetProfileResponse> => {
  const response = await GetAxiosInstance<GetProfileResponse>(`/api/v3/member/member-info`);

  return response.data;
};

// 닉네임 유효성 검증
export const checkNickname = async (nickname: string) => {
  const response = await GetAxiosInstance(`/api/v3/member/check-nickname`, {
    params: { nickname: nickname },
  });

  return response.data;
};

// 회원가입
export const signUp = async (
  data: SignUpRequest,
  temporaryToken: string,
): Promise<SignUpResponse> => {
  const response = await GuestPostAxiosInstance<SignUpResponse>(`/api/v3/member/sign-up`, data, {
    headers: {
      Authorization: `Bearer ${temporaryToken}`,
    },
  });

  return response.data;
};

// 로그인
export const signIn = async (data: SignInRequest): Promise<SignInResponse> => {
  const response = await GuestPostAxiosInstance<SignInResponse>(`/members/sign-in`, data);

  return response.data;
};
