import { create } from 'zustand';

import { MailState } from './type';

export const useMailAuthenticationStore = create<{
  mailState: MailState;
  setMailState: (newState: Partial<MailState>) => void;
}>((set) => ({
  mailState: {
    universityId: 0,
    universityName: '',
    majorName: '',
    mailAddress: '',
    code: '',
  },
  setMailState: (newState) =>
    set((state) => ({
      mailState: { ...state.mailState, ...newState },
    })),
}));
