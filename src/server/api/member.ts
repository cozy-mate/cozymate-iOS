import { GuestPostAxiosInstance } from '@axios/guest.axios.method';
import { GetAxiosInstance, PostAxiosInstance, DeleteAxiosInstance } from '@axios/axios.method';

import { SignInRequest, SignUpRequest, TestSignUpRequest } from '@server/requestTypes/member';
import {
  SignInResponse,
  SignUpResponse,
  GetProfileResponse,
  TestSignUpResponse,
  DeleteMemberResponse,
  CheckNicknameResponse,
  UpdatePersonaResponse,
  UpdateNicknameResponse,
  UpdateBirthdayResponse,
  UpdateMajorNameResponse,
} from '@server/responseTypes/member';

// 회원 탈퇴
export const deleteMember = async (): Promise<DeleteMemberResponse> => {
  const response = await DeleteAxiosInstance<DeleteMemberResponse>(`/members/withdraw`);

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

// 사용자 프로필 이미지 수정
export const updatePersona = async (persona: number): Promise<UpdatePersonaResponse> => {
  const response = await PostAxiosInstance<UpdatePersonaResponse>(`/members/update-persona`, null, {
    params: {
      persona: persona,
    },
  });

  return response.data;
};

// 사용자 닉네임 수정
export const updateNickname = async (nickname: string): Promise<UpdateNicknameResponse> => {
  const response = await PostAxiosInstance<UpdateNicknameResponse>(
    `/members/update-nickname`,
    null,
    {
      params: {
        nickname: nickname,
      },
    },
  );

  return response.data;
};

// 사용자 학과 수정
export const updateMajorName = async (majorName: string): Promise<UpdateMajorNameResponse> => {
  const response = await PostAxiosInstance<UpdateMajorNameResponse>(
    `/members/update-majorName`,
    null,
    {
      params: {
        majorName: majorName,
      },
    },
  );

  return response.data;
};

// 사용자 생일 수정
export const updateBirthday = async (localDate: string): Promise<UpdateBirthdayResponse> => {
  const response = await PostAxiosInstance<UpdateBirthdayResponse>(
    `/members/update-birthday`,
    null,
    {
      params: {
        localDate: localDate,
      },
    },
  );

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

export const testSignUp = async (data: TestSignUpRequest): Promise<TestSignUpResponse> => {
  const response = await PostAxiosInstance<TestSignUpResponse>(`/members/sign-up`, data);

  return response.data;
};
