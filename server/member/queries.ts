import { createQueryKeys } from '@lukemorales/query-key-factory';
import { getMemberProfile, getMemberUniversityInfo, checkNickname } from './member';

export const memberQueries = createQueryKeys('member', {
  universityInfo: () => ({
    queryKey: ['university-info'],
    queryFn: () => getMemberUniversityInfo(),
  }),
  profile: () => ({
    queryKey: ['member-info'],
    queryFn: () => getMemberProfile(),
  }),
  checkNickname: ({ nickname }: { nickname: string }) => ({
    queryKey: ['check-nickname', nickname],
    queryFn: () => checkNickname(nickname),
  }),
});
