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
}>((set) => ({
  signUpState: {
    nickname: '',
    gender: '',
    birthday: '',
    school: 0,
    persona: 0,
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
    name: '',
    nickname: '',
    gender: '',
    birthday: '',
    persona: 0,
  },
  setProfile: (newProfile) => set((state) => ({ profile: { ...state.profile, ...newProfile } })),
}));
