import { create } from 'zustand';

import { SignUpState } from './type';

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
