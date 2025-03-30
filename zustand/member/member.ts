import { create } from 'zustand';

import { MemberState, SignUpState } from './type';

export const useSignUpStore = create<{
  signUpState: SignUpState;
  setSignUpState: (newState: Partial<SignUpState>) => void;
}>((set) => ({
  signUpState: {
    nickname: '',
    gender: '',
    birthday: '',
    persona: 0,
    universityId: 1,
    majorName: '컴퓨터공학과',
  },
  setSignUpState: (newState) =>
    set((state) => ({
      signUpState: { ...state.signUpState, ...newState },
    })),
}));

export const useMemberStore = create<{
  memberState: MemberState;
  setMemberState: (newState: Partial<MemberState>) => void;
}>((set) => ({
  memberState: {
    memberId: 0,
    nickname: '',
    gender: '',
    birthday: '',
    universityName: '',
    universityId: 0,
    majorName: '',
    persona: 0,
  },
  setMemberState: (newState: any) =>
    set((state) => ({
      memberState: { ...state.memberState, ...newState },
    })),
}));
