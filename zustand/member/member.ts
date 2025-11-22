import { create } from 'zustand';

import { SignUpState, SignUpV2State } from './type';

export const useSignUpStore = create<{
  signUpState: SignUpState;
  setSignUpState: (newState: Partial<SignUpState>) => void;
  clearSignUpState: () => void;
}>((set) => ({
  signUpState: {
    nickname: '',
    gender: '',
    birthday: '',
    persona: 0,
  },
  setSignUpState: (newState) =>
    set((state) => ({
      signUpState: { ...state.signUpState, ...newState },
    })),
  clearSignUpState: () =>
    set(() => ({
      signUpState: {
        nickname: '',
        gender: '',
        birthday: '',
        persona: 0,
      },
    })),
}));

export const useSignUpV2Store = create<{
  signUpState: SignUpV2State;
  setSignUpState: (newState: Partial<SignUpV2State>) => void;
  clearSignUpState: () => void;
}>((set) => ({
  signUpState: {
    universityName: '',
    universityId: 0,
    majorName: '',
    nickname: '',
    gender: '',
    birthday: '',
    persona: 0,
  },
  setSignUpState: (newState) =>
    set((state) => ({
      signUpState: { ...state.signUpState, ...newState },
    })),
  clearSignUpState: () =>
    set(() => ({
      signUpState: {
        universityName: '',
        universityId: 0,
        majorName: '',
        nickname: '',
        gender: '',
        birthday: '',
        persona: 0,
      },
    })),
}));
