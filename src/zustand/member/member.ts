import { create } from 'zustand';

import { SignUp, Profile } from './type';

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
  clearSignUpState: () => void;
}>((set) => ({
  signUpState: {
    nickname: '',
    gender: '',
    birthday: '',
    persona: 0,
    universityId: 0,
    department: '',
  },
  setSignUpState: (newSignUpState) =>
    set((state) => ({
      signUpState: { ...state.signUpState, ...newSignUpState },
    })),
  clearSignUpState: () =>
    set(() => ({
      signUpState: {
        nickname: '',
        gender: '',
        birthday: '',
        persona: 0,
        universityId: 0,
        department: '',
      },
    })),
}));

// 사용자 정보
export const useProfileStore = create<{
  profile: Profile;
  setProfile: (newProfile: Partial<Profile>) => void;
  clearProfile: () => void;
}>((set) => ({
  profile: {
    memberId: 0,
    nickname: '',
    gender: '',
    birthday: '',
    universityId: 0,
    universityName: '',
    majorName: '',
    persona: 0,
  },
  setProfile: (newProfile) => set((state) => ({ profile: { ...state.profile, ...newProfile } })),
  clearProfile: () =>
    set(() => ({
      profile: {
        memberId: 0,
        nickname: '',
        gender: '',
        birthday: '',
        universityId: 0,
        universityName: '',
        majorName: '',
        persona: 0,
      },
    })),
}));

// 학교 인증 여부
export const useIsVerifiedStore = create<{
  isVerified: string;
  setIsVerified: (newStatus: string) => void;
}>((set) => ({
  isVerified: '',
  setIsVerified: (status) => set({ isVerified: status }),
}));
