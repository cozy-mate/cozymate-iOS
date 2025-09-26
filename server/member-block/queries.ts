import { createQueryKeys } from '@lukemorales/query-key-factory';
import { getBlockedMemberList, getMemberBlockStatus } from './member-block';

export const memberBlockQueries = createQueryKeys('memberBlock', {
  getMemberBlockStatus: ({ memberId }: { memberId: number }) => ({
    queryKey: ['status', memberId],
    queryFn: () => getMemberBlockStatus(memberId),
  }),
  getBlockedMemberList: () => ({
    queryKey: ['list'],
    queryFn: () => getBlockedMemberList(),
  }),
});
