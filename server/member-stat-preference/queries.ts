import { createQueryKeys } from '@lukemorales/query-key-factory';
import { getPreferenceList } from './member-stat-preference';

export const memberStatPreferenceQueries = createQueryKeys('memberStatPreference', {
  getPreferenceList: () => ({
    queryKey: ['list'],
    queryFn: () => getPreferenceList(),
  }),
});
