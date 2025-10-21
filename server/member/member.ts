import {
  DeleteAxiosInstance,
  GetAxiosInstance,
  PatchAxiosInstance,
  PostAxiosInstance,
} from '@/axios/axios.method';

import { SignUpRequest, UpdateMemberInfoRequest, WithdrawRequest } from './request';
import {
  CheckNicknameResponse,
  GetMemberProfileResponse,
  GetMemberUniversityInfoResponse,
  SignUpResponse,
  UpdateMemberInfoResponse,
  WithdrawResponse,
} from './response';

// 회원 탈퇴
export const withdraw = async (data?: WithdrawRequest): Promise<WithdrawResponse> => {
  const response = await DeleteAxiosInstance<WithdrawResponse>(`/members/withdraw`, data);

  return response.data;
};

// 인증된 학교 정보
export const getMemberUniversityInfo = async (): Promise<GetMemberUniversityInfoResponse> => {
  const response =
    await GetAxiosInstance<GetMemberUniversityInfoResponse>(`/members/university-info`);

  return response.data;
};

// 사용자 정보 조회
export const getMemberProfile = async (): Promise<GetMemberProfileResponse> => {
  const response = await GetAxiosInstance<GetMemberProfileResponse>(`/members/member-info`);

  return response.data;
};

// 닉네임 유효성 검증
export const checkNickname = async (nickname: string): Promise<CheckNicknameResponse> => {
  const response = await GetAxiosInstance<CheckNicknameResponse>(`/members/check-nickname`, {
    params: { nickname: nickname },
  });

  return response.data;
};

// 사용자 정보 수정
export const updateMemberInfo = async (
  data: UpdateMemberInfoRequest,
): Promise<UpdateMemberInfoResponse> => {
  const response = await PatchAxiosInstance<UpdateMemberInfoResponse>(`/members/update`, data);

  return response.data;
};

// 회원가입
export const signUp = async (data: SignUpRequest): Promise<SignUpResponse> => {
  const response = await PostAxiosInstance<SignUpResponse, SignUpRequest>(`/members/sign-up`, data);

  return response.data;
};
