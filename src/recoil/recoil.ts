import { atom } from 'recoil';

export const feedRefreshState = atom<boolean>({
  key: 'needsRefresh',
  default: false,
});

export const postDetailRefreshState = atom<boolean>({
  key: 'postDetailRefresh',
  default: false,
});
