import { GuestPostAxiosInstance } from '@axios/guest.axios.method';
import { GetAxiosInstance, PostAxiosInstance, DeleteAxiosInstance } from '@axios/axios.method';

import { SignInRequest, SignUpRequest } from '@server/requestTypes/member';
import {
  SignInResponse,
  SignUpResponse,
  GetProfileResponse,
  DeleteMemberResponse,
  CheckNicknameResponse,
} from '@server/responseTypes/member';

// 회원 탈퇴
export const deleteMember = async (): Promise<DeleteMemberResponse> => {
  const response = await DeleteAxiosInstance<DeleteMemberResponse>(`/members/withdraw`);

  return response.data;
};

// 로그아웃
export const signOut = async () => {
  const response = await GetAxiosInstance(`/members/sign-out`);

  return response.data;
};

// 사용자 정보 조회
export const getMyProfile = async (): Promise<GetProfileResponse> => {
  const response = await GetAxiosInstance<GetProfileResponse>(`/members/member-info`);

  return response.data;
};

// 닉네임 유효성 검증
export const checkNickname = async (nickname: string): Promise<CheckNicknameResponse> => {
  const response = await GetAxiosInstance<CheckNicknameResponse>(`/members/check-nickname`, {
    params: { nickname: nickname },
  });

  return response.data;
};

// 회원가입
export const signUp = async (data: SignUpRequest): Promise<SignUpResponse> => {
  const response = await PostAxiosInstance<SignUpResponse>(`/members/sign-up`, data);

  return response.data;
};

// 로그인
export const signIn = async (data: SignInRequest): Promise<SignInResponse> => {
  const response = await GuestPostAxiosInstance<SignInResponse>(`/members/sign-in`, data);

  return response.data;
};
