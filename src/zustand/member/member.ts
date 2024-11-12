import { create } from 'zustand';

import { SignUp, Profile, MemberInfo } from './type';

// 로그인 상태
export const useLoggedInStore = create<{
  loggedIn: boolean;
  setLoggedIn: (status: boolean) => void;
}>((set) => ({
  loggedIn: false,
  setLoggedIn: (status) => set({ loggedIn: status }),
}));

// 최초 회원가입 시 사용자 정보
export const useSignUpStore = create<{
  signUpState: SignUp;
  setSignUpState: (newSignUpState: Partial<SignUp>) => void;
}>((set) => ({
  signUpState: {
    nickname: '',
    gender: '',
    birthday: '',
    persona: 0,
    universityId: 0,
  },
  setSignUpState: (newSignUpState) =>
    set((state) => ({
      signUpState: { ...state.signUpState, ...newSignUpState },
    })),
}));

// 사용자 정보
export const useProfileStore = create<{
  profile: Profile;
  setProfile: (newProfile: Partial<Profile>) => void;
}>((set) => ({
  profile: {
    memberId: 0,
    nickname: '',
    gender: '',
    birthday: '',
    universityName: '',
    majorName: '',
    persona: 0,
  },
  setProfile: (newProfile) => set((state) => ({ profile: { ...state.profile, ...newProfile } })),
}));

// 다른 사용자의 기본 정보 저장
export const useMemberInfoStore = create<{
  memberInfo: MemberInfo;
  setMemberInfo: (newMemberInfo: Partial<MemberInfo>) => void;
}>((set) => ({
  memberInfo: {
    memberId: 0,
    memberNickName: '',
    memberAge: 0,
    memberPersona: 0,
    equality: 0,
  },
  setMemberInfo: (newMemberInfo) =>
    set((state) => ({ memberInfo: { ...state.memberInfo, ...newMemberInfo } })),
}));
