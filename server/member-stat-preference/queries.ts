import { createQueryKeys } from '@lukemorales/query-key-factory';
import { getPreferenceList } from './member-stat-preference';

export const memberStatPreferenceQueries = createQueryKeys('memberStatPreference', {
  list: () => ({
    queryKey: ['list'],
    queryFn: () => getPreferenceList(),
  }),
});
