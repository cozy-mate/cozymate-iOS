import { createQueryKeys } from '@lukemorales/query-key-factory';
import { getMyUniversityInfo, getUniversityList, getUniversityInfo } from './university';

export const universityQueries = createQueryKeys('university', {
  list: () => ({
    queryKey: ['list'],
    queryFn: () => getUniversityList(),
  }),
  detail: ({ universityId }: { universityId: number }) => ({
    queryKey: ['detail', universityId],
    queryFn: () => getUniversityInfo(universityId),
  }),
  myUniversity: () => ({
    queryKey: ['my-university'],
    queryFn: () => getMyUniversityInfo(),
  }),
});
