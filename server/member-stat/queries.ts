import { createQueryKeys } from '@lukemorales/query-key-factory';
import {
  getMemberDetail,
  getMemberList,
  getMyDetail,
  getRandomMemberList,
  searchUser,
} from './member-stat';

export const memberStatQueries = createQueryKeys('memberStat', {
  myDetail: () => ({
    queryKey: ['my-detail'],
    queryFn: () => getMyDetail(),
  }),
  suspenseMyDetail: () => ({
    queryKey: ['my-detail-suspense'],
    queryFn: () => getMyDetail(),
  }),
  detail: ({ memberId }: { memberId: number }) => ({
    queryKey: ['detail', memberId],
    queryFn: () => getMemberDetail(memberId),
  }),
  searchUser: ({ keyword }: { keyword: string }) => ({
    queryKey: ['search', keyword],
    queryFn: () => searchUser(keyword),
  }),
  randomList: () => ({
    queryKey: ['random'],
    queryFn: () => getRandomMemberList(),
  }),
  list: ({ filterList, hasRoom }: { filterList?: string[]; hasRoom?: boolean }) => ({
    queryKey: ['list', filterList, hasRoom],
    queryFn: ({ pageParam = 0 }: { pageParam: number }) =>
      getMemberList(pageParam, filterList, hasRoom),
  }),
  filterHome: () => ({
    queryKey: ['filter-home'],
    queryFn: () => getMemberList(0),
  }),
});
