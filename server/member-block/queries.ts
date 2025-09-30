import { createQueryKeys } from '@lukemorales/query-key-factory';
import { getBlockedMemberList, getMemberBlockStatus } from './member-block';

export const memberBlockQueries = createQueryKeys('memberBlock', {
  status: ({ memberId }: { memberId: number }) => ({
    queryKey: ['status', memberId],
    queryFn: () => getMemberBlockStatus(memberId),
  }),
  list: () => ({
    queryKey: ['list'],
    queryFn: () => getBlockedMemberList(),
  }),
});
