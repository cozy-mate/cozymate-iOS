import { createQueryKeys } from '@lukemorales/query-key-factory';
import { getUniversityList } from './university';

export const universityQueries = createQueryKeys('university', {
  getUniversityList: () => ({
    queryKey: ['list'],
    queryFn: () => getUniversityList(),
  }),
});
