import { createQueryKeys } from '@lukemorales/query-key-factory';
import {
  getMemberDetail,
  getMemberList,
  getMyDetail,
  getRandomMemberList,
  searchUser,
} from './member-stat';

export const memberStatQueries = createQueryKeys('memberStat', {
  getMyDetail: () => ({
    queryKey: ['my-detail'],
    queryFn: () => getMyDetail(),
  }),
  getMemberDetail: ({ memberId }: { memberId: number }) => ({
    queryKey: ['detail', memberId],
    queryFn: () => getMemberDetail(memberId),
  }),
  searchUser: ({ keyword }: { keyword: string }) => ({
    queryKey: ['search', keyword],
    queryFn: () => searchUser(keyword),
  }),
  getRandomMemberList: () => ({
    queryKey: ['random'],
    queryFn: () => getRandomMemberList(),
  }),
  getMemberList: ({
    page,
    filterList,
    hasRoom,
  }: {
    page: number;
    filterList?: string[];
    hasRoom?: boolean;
  }) => ({
    queryKey: ['list', page, filterList, hasRoom],
    queryFn: () => getMemberList(page, filterList, hasRoom),
  }),
});
